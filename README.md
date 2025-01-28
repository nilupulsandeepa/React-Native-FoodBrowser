## Code Signing
### iOS
1) Generate Certificates
* Login in to Apple Developer Account
* Go to Certificates -> Indentifiers & Profile
* Create a new Development Certificate and Distribution Certificate
(Certificate Signing Request can be created using KeyChainAccess)

2) Configure Provisioning Profiles
* Create Development Provisioning Profile for development
* Create Distribution Provisioning Profile for distribution (Ad-hoc, Enterprise or AppStore)

3) Setup App Identifiers
* Define App IDs for each variant
    * com.exampleapp.application.dev
    * com.exampleapp.application.prod

4) Add Entitlements
* Add entitlemens for app capabilities like Push Notification, iCloud, etc.
    * Development Entitlements for development
    * Distribution Entitlements for production

5) Configure Xcode
* Install certificates and profiles
* Use schemes for environment-specific builds

### Android
1) Generate Keystore
* Use keytool in JDK

2) Configure app/build.gradle
* Add release signingConfigs
* Add release buildTypes

3) Environment-Specific Keystores:
* Define signingConfig inside productFlavors if using environment-specific keystores

4) Distribute AAB and APK


# Run Instructions
1) Clone the project
2) Run npm install
3) Run npm test for unit tests
4) Run npm run ios-dev to run iOS development build
5) Run npm run ios-prod to run iOS production build
6) Run npm run android-dev to run Android development build
7) Run npm run android-prod to run Android production build