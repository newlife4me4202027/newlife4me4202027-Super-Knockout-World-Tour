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
