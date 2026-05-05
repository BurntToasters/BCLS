<!-- bcls:partial -->
<!-- bcls:ignore-start -->
<!--
Reusable downloads-table block.

Replace placeholders:
  <ORG>           GitHub user/org (e.g. BurntToasters)
  <APP>           GitHub repo name + asset filename prefix (e.g. IYERIS)
  <TAG>           Release tag including the leading v (e.g. v2.1.2)
  <MS_STORE_ID>   Microsoft Store listing id; remove the badge cell if not on the Store

Drop columns / cells your app doesn't ship. Comment out arch links you haven't
built yet (the `<!-- / [arm64](...) -->` pattern) so future enabling is one edit.
-->

# ⬇️ Downloads

| <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/windows.png" /> Windows | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/mac.png" /> macOS | <img height="20" src="https://raw.githubusercontent.com/BurntToasters/bcls/main/media/linux.png" /> Linux |
| :--- | :--- | :--- |
| **EXE:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-x64.exe) / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Win-arm64.exe) | **[Universal DMG](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.dmg)** | **AppImage:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.AppImage) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.AppImage) --> |
| <div align="center"><a href="https://apps.microsoft.com/detail/<MS_STORE_ID>?referrer=appbadge&mode=full"><img src="https://get.microsoft.com/images/en-us%20light.svg" width="150"/></a></div> | **[Universal ZIP](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-MacOS-universal.zip)** | **DEB:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-amd64.deb) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-arm64.deb) --> |
| *See MSI note below* | | **RPM:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.rpm) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.rpm) --> |
| | | **Flatpak:** [x64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-x86_64.flatpak) <!-- / [arm64](https://github.com/<ORG>/<APP>/releases/download/<TAG>/<APP>-Linux-aarch64.flatpak) --> |
<!-- bcls:ignore-end -->
