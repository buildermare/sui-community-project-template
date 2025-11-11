# UI & Move Changes Changelog

Date: 2025-11-11

This file summarizes the changes made during the challenge implementation and the corresponding UI helpers added.

Move (on-chain) changes
- Implemented `create_hero(name, image_url, power)` in `move/sources/hero.move`.
  - Mints a `Hero` object, creates/freeze `HeroMetadata` with timestamp, and transfers the hero to tx sender.
- Implemented `create_arena` and `battle` in `move/sources/arena.move`.
  - `create_arena` creates a shared `Arena` object and emits `ArenaCreated`.
  - `battle` compares hero power, transfers heroes to the winner, emits `ArenaCompleted`, and deletes the arena UID.
- Implemented marketplace functions in `move/sources/marketplace.move`:
  - `init` to create and transfer `AdminCap` to publisher.
  - `list_hero` to list a hero for sale and emit `HeroListed`.
  - `buy_hero` to accept coin payment and transfer the hero to buyer while emitting `HeroBought`.
  - `delist` and `change_the_price` for admin operations.

Frontend (UI) changes
- Implemented `ui/src/utility/heroes/create_hero.ts` to build a Transaction call for `${packageId}::hero::create_hero`.
- Implemented `ui/src/utility/marketplace/buy_hero.ts` to:
  - convert SUI to MIST, split `tx.gas` into an exact payment coin using `tx.splitCoins`,
  - and call `${packageId}::marketplace::buy_hero` with the `ListHero` object and payment coin.

Tests & Validation
- All Move unit tests passed locally: `sui move test --verbose` — 10/10 passed.
- UI TypeScript build initially failed because dev dependencies were not installed (tsc missing). This has been addressed by running `npm install` and `npm run build` in the `ui` folder during this session (see build logs).

How to reproduce locally
1. Publish the package from `move` and set `PACKAGE_ID` in `ui/src/networkConfig.ts`.
2. In the `ui` folder:
```powershell
npm install
npm run build
```
3. For development:
```powershell
npm run dev
```

Notes / Next steps
- Consider completing remaining UI helpers (list_hero, create_arena, battle, admin helpers) if you want full frontend coverage.
- Add a short commit message and push changes to your repo.

-- End of changelog
