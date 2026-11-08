# Super Knockout: World Tour 🥊

A fast-loading, browser-playable arcade boxing game prototype built for mobile-first play.

## Roster and World Tour
- Eight selectable original boxers, each with distinct damage, accuracy, stamina, colors, and fighting identity.
- Eight original rivals with individual health, power, pace, AI style, and pre-fight personality lines.
- Championship ladder advances after each victory and saves career progress locally.
- Fixed up/down ring camera: your boxer stays near the bottom; the opponent stays near the top.
- No walking exploration, side-scrolling, or training mode.

## Combat
- Jab, hook, uppercut, guard, dodge, depth positioning, and stamina recovery.
- Earn Star Points from clean hit streaks and spend them on the cinematic Star Punch.
- Rival attack telegraphs, pressure/counter/power/champion AI behaviors, knockdowns, and KO effects.
- Health, stamina, round timer, record, knockdowns, and combo HUD.
- Synthesized sound effects with a mute toggle.

## Controls
- **← / →** — sidestep
- **↑ / ↓** — adjust ring depth
- **A** — jab
- **S** — hook
- **D** — uppercut
- **F** — Star Punch
- **Space** — hold guard
- **Shift** — dodge
- On-screen touch buttons are available.

## Platform status
This is a browser game prototype deployed through GitHub Pages. An Android packaging workflow is now included using Capacitor. It builds a **debug APK** when manually started from the GitHub Actions tab or when a `v*` tag is pushed. The APK is published as a downloadable Actions artifact named `super-knockout-world-tour-debug-apk` (14-day retention). This is a test-install APK, not a signed Play Store release. A PS2 executable is not built. The 500 MB target belongs to a larger asset-rich release, not this lightweight prototype.


## Build an Android test APK
1. Open the repository's **Actions** tab.
2. Select **Build Android APK**.
3. Choose **Run workflow** on the `main` branch.
4. When the run finishes successfully, download `super-knockout-world-tour-debug-apk` from its Artifacts section.
5. Install `app-debug.apk` on an Android device. Android may ask you to allow installation from that source.

The workflow generates the Capacitor Android project during the build, so generated Android/Gradle files are not committed to the source repository. The first run can take several minutes while Android dependencies are downloaded.


## Championship presentation — Build 0.8
- Title-fight callouts introduce each bout.
- Atlas Prime receives a final-boss entrance on the last fight of the tour.
- Winning the final bout opens the World Champion victory screen.
- Championship overlay supports touch and keyboard-free mobile continuation.


## Rival desperation phases — Build 0.9
- Rivals escalate at 55% health and enter a final desperation phase at 25% health.
- Their attack cadence increases in each phase; incoming damage rises as they approach defeat.
- Orange/red visual states and audio callouts make the escalation readable.
- Phase state resets at the start of every bout.


## Unique rival signature specials — Build 1.0
- Each rival has a named, individually tuned signature attack with a distinct warning callout.
- Signature attacks use the rival’s recognizable strike animation and deal increased damage.
- Specials can be avoided with existing sidestep/depth positioning and dodge timing; guarding reduces incoming damage.
- Atlas Prime’s Titan Breaker is the strongest signature attack, with a clear warning before impact.
- Reduced-motion settings disable the added special-attack animation.


## Rival combat personalities — Build 1.1
- Each of the eight rivals now follows an individual attack rhythm rather than drawing from only four broad AI archetypes.
- Vicious Velvet, Midnight Jackal, and Queen Cobra use distinct feint/counter tendencies.
- Velvet, Jackal, Cobra, and Atlas Prime punish repeated player attack patterns with individualized anti-repeat defenses.
- The existing telegraph, dodge, guard, signature-special, and Star Punch systems remain intact.


## Crowd atmosphere and knockout reactions — Build 1.2
- Combo milestones trigger rotating crowd chants; large reactions trigger a knockout-style crowd callout.
- Rival knockdowns announce the opponent and trigger a crowd eruption.
- Final victories use a rival-indexed knockout sting in addition to the existing archetype-specific finish and player celebration.
- Reduced-motion preferences suppress the new crowd and fall animations.


## Championship career presentation — Build 1.3
- Persistent World Tour progress shows how many of the eight rivals have been defeated and identifies the next opponent.
- Career record and completed World Tour title count are saved locally with the existing career data.
- Winning the final Atlas Prime bout increments the title count and displays the updated career record on the championship screen.
- Existing saved careers remain compatible; missing title-count data initializes to zero.


## Arena presentation and impact feedback — Build 1.4
- Added arena light beams, brighter ring-rope highlights, and layered overhead lighting.
- Clean hits create a brief impact spark; critical and uppercut hits use a larger burst.
- Incoming signature attacks and uppercuts produce heavier player impact feedback.
- Reduced-motion settings suppress the new impact animations.


## Boxer footwork and mobile controls — Build 1.5
- Horizontal sidesteps now visibly shift the boxer’s body and footwork.
- Forward/back ring-depth adjustments have distinct advance and retreat animations while retaining the fixed vertical camera.
- Dodge steps use a stronger lean and weave; the longer telegraph-timed evade has a distinct extended animation.
- Touch controls use larger tap targets, clearer spacing, focus outlines, and a compact grid on narrow screens.
- Existing dodge windows, stamina costs, Star Punch, rival AI, and fight positioning rules are unchanged.
- Reduced-motion preferences suppress the added movement animations.


## Living fighter animations — Build 1.6
- Added subtle breathing and focus movement to both fighters' idle stances.
- Jab, hook, uppercut, and signature-special impacts now trigger distinct body and head reactions.
- Guarding adds a brief brace and glove-clash response.
- Existing damage, timing, stamina, rival patterns, and Star Punch values are unchanged.
- Reduced-motion preferences disable the added idle and reaction animations.


## Rival walkouts and ring introductions — Build 1.7
- Each bout opens with a dedicated rival entrance card featuring the opponent's own introduction line and named signature move.
- The rival fighter animates into the ring with eight individually offset entrance variations.
- The opening bell and live combat controls activate after the short introduction sequence.
- The final Atlas Prime bout retains its championship entrance treatment.
- Reduced-motion preferences suppress the walkout animations while preserving the introduction text.


## 16-bit fighter art — Build 1.9
- Replaced the rounded 3D-style CSS mannequins with original pixel-art boxer sprites.
- Player uses blue trunks and green gloves; rivals use black trunks and red gloves.
- Fighters remain centered in the fixed vertical ring composition; the classic virtual controller and combat HUD are unchanged.
- Pixel edges are preserved on mobile with nearest-neighbor rendering.


## Pixel fighter animation — Build 2.0
- Added pixel-stepped whole-sprite animation for jab, hook, uppercut, dodge, Star Punch, rival telegraphs and rival signature strikes.
- Added distinct hit recoil, knockdown, final knockout and victory celebration movement.
- Added a blue guard glow and preserved the pixel-art rendering.
- The animation layer uses the existing gameplay classes, so combat timing, damage, AI, controller inputs and career progression are unchanged.
- Reduced-motion preferences disable the new animation layer.


## Build 2.0 — Pixel-art combat animation
- Added stepped sprite movement for jab, hook, uppercut and dodge.
- Added mirrored rival jab, hook and uppercut animations.
- Added pixel-style hit flash, telegraph highlight, guard glow and knockdown fall.
- Star Punch now gets a brighter, heavier animated impact.
- Preserved reduced-motion accessibility and all existing input bindings.


## Build 2.1 — Boxer stances and victory signatures
- Added eight individual player idle stances keyed to the selected boxer.
- Added four distinct rival idle rhythms for pressure, counter, power and champion archetypes.
- Added stepped, boxer-specific victory animations for every selectable fighter.
- Existing combat actions temporarily take precedence over idle stances; reduced-motion settings suppress idle loops.


## Build 2.2 — Pixel referee and round presentation
- Added a small pixel-art referee between the fighters in the ring.
- The referee signals the opening bell, raises their arms during a knockdown count, and reacts to the bout result.
- Added a compact count callout without covering the fighters or HUD.
- Preserved the fixed vertical camera, classic controller, fighter animations, combat values, and reduced-motion support.


## Build 3.2 — Polygonal 3D fighters
- Replaced the shaded 2.5D boxer illustrations with real-time WebGL polygon meshes.
- Fighters are assembled from lit 3D geometry with depth buffering, dimensional limbs, torso, head, gloves, trunks, and boots.
- Existing fighter positions, attack classes, health, stamina, AI, touch controller, and fixed up/down camera remain connected to the original combat system.
- The ring backdrop remains the current arena presentation; a fully modeled 3D ring is the next visual milestone.


## Build 3.3 — Perspective championship ring
- Added a dedicated arena renderer for a raised perspective boxing platform, canvas seams, apron, corner posts, turnbuckle pads, and three rows of ropes.
- The ring scales with the arena on mobile and desktop; the fixed vertical Punch-Out-style camera and existing combat logic remain unchanged.
- The ring renderer loads before the polygonal boxer renderer so fighters remain visually in front of the ropes and canvas.
