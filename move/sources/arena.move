module challenge::arena;

use challenge::hero::Hero;
use sui::event;

// ========= STRUCTS =========

public struct Arena has key, store {
    id: UID,
    warrior: Hero,
    owner: address,
}

// ========= EVENTS =========

public struct ArenaCreated has copy, drop {
    arena_id: ID,
    timestamp: u64,
}

public struct ArenaCompleted has copy, drop {
    winner_hero_id: ID,
    loser_hero_id: ID,
    timestamp: u64,
}

// ========= FUNCTIONS =========

public fun create_arena(hero: Hero, ctx: &mut TxContext) {

    let arena = Arena {
        id: object::new(ctx),
        warrior: hero,
        owner: ctx.sender(),
    };

    let event = ArenaCreated {
        arena_id: object::id(&arena),
        timestamp: ctx.epoch_timestamp_ms(),
    };

    // Emit creation event and share the arena so others can interact with it
    sui::event::emit(event);
    transfer::share_object(arena);
}

#[allow(lint(self_transfer))]
public fun battle(hero: Hero, arena: Arena, ctx: &mut TxContext) {
    
    // Destructure the arena to move its non-copy fields out
    let Arena { id, warrior, owner } = arena;

    // Compare powers and transfer both heroes to the winner
    if (challenge::hero::hero_power(&hero) > challenge::hero::hero_power(&warrior)) {
        let winner_id = object::id(&hero);
        let loser_id = object::id(&warrior);

        // winner is tx sender
        transfer::public_transfer(hero, ctx.sender());
        transfer::public_transfer(warrior, ctx.sender());

        let event = ArenaCompleted {
            winner_hero_id: winner_id,
            loser_hero_id: loser_id,
            timestamp: ctx.epoch_timestamp_ms(),
        };

        sui::event::emit(event);
    // delete arena UID after emitting event
    object::delete(id);
    } else {
        let winner_id = object::id(&warrior);
        let loser_id = object::id(&hero);

        // winner is arena owner
        transfer::public_transfer(hero, owner);
        transfer::public_transfer(warrior, owner);

        let event = ArenaCompleted {
            winner_hero_id: winner_id,
            loser_hero_id: loser_id,
            timestamp: ctx.epoch_timestamp_ms(),
        };

        sui::event::emit(event);
    // delete arena UID after emitting event
    object::delete(id);
    }
}

