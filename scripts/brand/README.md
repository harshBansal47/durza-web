# Durza brand assets

The logo is a white **D** on an orange tile (`#EE5A0B`), with a semicircular
bite out of the stem like the stub of a torn coupon. The wordmark is Poppins
Bold, outlined, so no font is needed at runtime.

`build.py` and `splash.py` regenerate every size from one geometry definition.
Where the outputs go:

| Output | Destination |
| --- | --- |
| `logo*.svg`, `logo*.png`, `icon-*.png`, `favicon.ico`, `apple-touch-icon.png` | `public/` |
| `android/mipmap-*/` | `android/app/src/main/res/mipmap-*/` |
| `android-splash/<density>/splash.png` | `android/app/src/main/res/<density>/splash.png` |
| `ios-AppIcon-512@2x.png` | `ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png` |
| `ios-splash-2732x2732.png` | the three files in `ios/App/App/Assets.xcassets/Splash.imageset/` |

`lib/brand.ts` holds the same path for the React `Logo`, favicon and OG images.
