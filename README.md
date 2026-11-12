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


## Animated boxer models — Build 3.4
- Polygonal fighters now animate their idle stance with subtle upper-body movement instead of remaining perfectly still.
- Sidestep and depth movement trigger visible footwork in the legs and stance.
- Punches extend the striking glove while the opposite hand stays closer to guard, with distinct reach for jabs, hooks, and uppercuts.
- Guarding raises the gloves into a defensive position; impact and knockdown states feed into the model pose.
- The fixed vertical Punch-Out camera, ring layout, combat rules, and touch controls remain unchanged.


## Combat animation polish — Build 3.5
- Opponents visibly move their head while telegraphing an incoming attack.
- Rival attacks show clearer forward follow-through.
- Successful hits trigger upper-body and head recoil on the affected boxer.
- Existing telegraph timing, combat calculations, touch controls, and classic vertical camera are preserved.


## Knockdown count and recovery — Build 3.6
- Rival knockdowns now run a visible referee count from one through three, with a separate count pulse for each beat.
- The fallen boxer remains down longer, then returns to a standing pose as the count sequence completes.
- Existing knockdown triggers, recovery health, combat timing, and fixed vertical camera remain unchanged.

## Boxer anatomy and facial detail — Build 3.7
- Refined polygonal head details with visible eyes, brows, nose, mouth, and ears on the front-facing rival.
- Tuned chest and torso geometry for a more defined athletic silhouette while retaining the established boxer scale.
- Existing animation states, hit reactions, combat rules, touch controls, and fixed vertical camera remain unchanged.

## Full-body punch and impact motion — Build 3.8
- Added hip-pivot rotation across the complete polygon mesh so punch follow-through and hit recoil move the full boxer silhouette.
- Added a subtle directional body displacement during impact to make clean hits read more clearly.
- Preserved existing attack reach, knockdown timing, combat calculations, mobile controls, and fixed vertical camera.


## 3D fighter visibility and individualized rival stances — Build 3.9
- Fixed the arena visibility rule so the WebGL polygonal boxer canvas remains visible above legacy sprite elements.
- Added eight distinct rival idle guard profiles, with controlled differences in glove height, arm spacing, elbow position, and body posture.
- Rival stance selection follows the current World Tour opponent; player controls, attack logic, and the fixed top-to-bottom camera are unchanged.
- Updated the offline cache version so installed copies request the corrected renderer and styles.


## Boxer anatomy and punch animation pass — Build 3.10
- Refined the polygonal torso with clearer pectoral, shoulder, upper-back, and abdominal forms while keeping the existing character proportions.
- Rebuilt the gloves with a separate cuff, rounded palm shell, raised knuckle pad, and thumb volume for a more recognizable boxing silhouette.
- Punch reach now follows a timed extension-and-return curve instead of holding the glove at full extension for the entire attack state.
- Updated the offline cache version to v9 so the refreshed fighter renderer is picked up by installed copies.


## Fighter movement and impact animation — Build 3.11
- Reworked the boxer legs with articulated knee segments and timed foot lifts during sidesteps and ring-depth movement.
- Added a short step envelope so movement has a clear push-off and recovery instead of continuous leg swinging.
- Hook, uppercut, jab, and special-hit reactions now produce different head recoil directions and intensities.
- The fixed up/down camera, combat timing, damage values, and controller layout remain unchanged.
- Updated the service-worker cache to version 10 so installed clients fetch the new fighter renderer.


## Clear fighter separation — Build 3.12
- Repositioned the opponent into a dedicated upper-ring lane and the player into a dedicated lower-ring lane.
- Adjusted both fighter canvas proportions and stacking so the two full-body boxers read as separate opponents, with open ring space between them.
- Kept the fixed vertical Punch-Out-style camera, existing fighter models, combat logic, and controller layout.
- Updated the offline cache to version 11 so installed copies receive the layout correction.


## Build 3.12 — Full-body vertical camera framing
- Added a small, uniform WebGL framing adjustment so both boxers fit comfortably inside their upper and lower ring lanes.
- Preserved the complete head-to-toe silhouettes during idle, guard, and punch poses.
- Kept the fixed vertical camera, touch controller, and combat logic unchanged.
- Updated the offline cache to v12 so installed copies fetch the framing adjustment.


## Build 3.13 — Mobile rendering performance
- Capped the two WebGL boxer render loops at approximately 30 frames per second to reduce repeated mesh generation and GPU uploads on phones.
- Skipped boxer rendering when the page is backgrounded or the fighter is outside the visible screen area.
- Throttled the ring canvas to the same frame budget and paused its drawing while the page is hidden.
- Preserved combat timing, input handling, boxer animations, and the vertical ring layout; this changes visual rendering cadence, not game simulation speed.
- Updated the offline cache to v13.


## Live browser layout verification — Build 3.13
- Expanded the GitHub Pages workflow to syntax-check all three game JavaScript files before deployment.
- The Playwright gameplay test now checks that both WebGL boxer canvases render at usable sizes and that the opponent's upper-ring lane does not overlap the player's lower-ring lane.
- The test still enters a match, performs a jab and sidestep, captures the live gameplay screenshot, and fails on browser JavaScript errors.


## Build 3.14 — clearer boxer spacing
- Lowered the player's ring lane slightly to create a visible gap between the two full-body WebGL fighters.
- Applied the same spacing adjustment to narrow mobile layouts while keeping both boxers inside the ring.
- Updated the offline cache to v14.


## Build 3.15 — visible version label
- Corrected the in-game footer, which still displayed the original Build 3.3 label despite the later renderer, layout, and gameplay updates.
- The footer now identifies the deployed release as Build 3.15.
- Updated the offline cache to v15 so installed copies receive the corrected build label.


## Build 3.16 — clear fighter spacing
- Increased the vertical gap substantially instead of relying on the previous near-touching layout bounds.
- Moved the rival into a smaller upper lane and the player into a smaller lower lane on desktop and mobile.
- Updated the visible build label and offline cache to v16.


## Build 3.19 — remove duplicate legacy boxer and clean gameplay framing
- Removed orphaned legacy CSS boxer parts that were still rendered outside the two WebGL fighter containers, creating the appearance of a third boxer overlapping the player.
- Kept the player and rival as the only full-body fighter models in the ring.
- Hid the referee during ordinary live combat; the referee still appears for the opening bell, knockdown counts, and bout results.
- Updated the visible build label and offline cache to v18.
- Expanded browser validation to capture desktop and mobile gameplay after temporary callouts clear, and to check referee visibility as well as fighter separation.


## Build 3.20 — one 3D fighter render per lane
- Removed the legacy SVG boxer layers from the active fighter containers so they cannot render on top of the WebGL polygon models.
- Increased the polygon model framing within each dedicated upper/lower lane while preserving the tested vertical gap.
- Kept the referee hidden during ordinary combat and available for bell, knockdown count, and result cues.
- Updated the visible build label and offline cache to v19.
- Expanded browser checks to confirm no fallback SVG boxer layers or callout overlays remain in the captured gameplay screenshots.


## Build 3.21 — remove the center-ring overlay character
- Removed the pixel referee DOM character from the live ring so no third figure can overlap the player or rival during combat.
- Kept the two WebGL polygon fighters as the only characters rendered in the ring.
- Updated the visible build label and offline cache to v20.
- Browser validation now confirms there is no referee element, no fallback SVG boxer, and no overlapping fighter lane on desktop or mobile.


## Build 3.22 — remove legacy pixel-art background layers
- Found and disabled the old player.png and rival.png CSS background sprites that were still rendering behind the polygonal WebGL fighters.
- The active ring now uses only the two WebGL fighter canvases; no legacy SVG, sprite background, or referee DOM character remains.
- Updated the visible build label and offline cache to v21.
- Added a browser assertion that both fighter containers have no background image.


## Build 3.23 — mobile rendering optimization
- Reduced polygon mesh tessellation for fighter spheres and cylinders to lower per-frame vertex generation and GPU upload work while preserving the overall 3D silhouettes.
- Reduced the ring renderer's maximum device-pixel ratio from 1.6 to 1.25 to lower canvas fill cost on high-density mobile screens.
- Preserved combat simulation, attack timing, damage, AI, and touch controls; these changes affect visual rendering workload only.
- Updated the visible game build label and offline cache to v22.


## Build 3.24 — Android renderer packaging and validation
- Fixed the Android packaging workflow to copy both `ring-renderer.js` and `model-renderer.js` into the Capacitor web asset directory. These scripts are loaded by `index.html` and are required for the 3D arena and fighter renderers.
- Added workflow checks confirming both renderer files exist in the Android web asset directory before the native project is generated.
- Expanded the JavaScript validation command to syntax-check the game, ring renderer, fighter renderer, and service worker.
- Updated the visible build label and offline cache to v23.


## Build 3.25 — unified mobile graphics budget
- Reduced the WebGL fighter canvas maximum device-pixel ratio from 1.5 to 1.25, matching the ring renderer's mobile graphics cap.
- Lowered fighter canvas pixel workload on high-density screens while preserving the 3D models, animation cadence, combat simulation, damage, and controls.
- Updated the visible build label and offline cache to v24.
