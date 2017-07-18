These instructions are necessary since the call to ./gradlew assembleRelease does not work properly in 0.46


from https://gist.github.com/marty-wang/5a71e9d0a6a2c6d6263c#file-gistfile1-txt


Disclaimer: The instructions are the collective efforts from a few places online. 
Nothing here is my original. But I want to put them together in one place to save people from spending the same time as I did.

First off, bundle.
==================

1. cd to the project directory
2. Start the react-native packager if not started
3. Download the bundle to the asset folder:
curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"

(Credit: https://github.com/facebook/react-native/issues/2743#issuecomment-140697340)

Note: make sure there is assets folder under android/app/src/main beforehand, and check if there is any error in the packager terminal window after curl.

Secondly, compile release version.
==================================

1. cd to {YOUR_PROJECT}/android
2. ./gradlew assembleRelease

Thirdly, sign the apk.
======================

1. To generate keystore
keytool -genkey -v -keystore my-keystore.keystore -alias name_alias -keyalg RSA -validity 10000

2. To sign an apk
jarsigner -verbose -keystore <path of my-keystore.keystore> <path of apk>  alias_name

3. To zip align an apk
zipalign -f -v 4 <your.apk >  <your_aligned.apk>

(Credit: http://stackoverflow.com/questions/26828372/how-to-sign-a-modded-an-apk-on-a-mac-with-apktool)

Lastly, install apk to device.
==============================

1. connect your phone to computer
2. adb install {PATH_TO_APK}