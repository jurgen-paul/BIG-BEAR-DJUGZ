# ProGuard & R8 Hardening Guide

This document explains the configuration in [`proguard-rules.pro`](../proguard-rules.pro) used for compiling, shrinking, obfuscating, and hardening **Big Bear Djugs: Interactive Adventure** when packaged for Android (Capacitor, Cordova, WebView, or native wrappers).

---

## 1. Overview of ProGuard / R8

ProGuard and R8 provide four essential security and performance benefits:
1. **Shrinking**: Detects and removes unused classes, fields, methods, and attributes.
2. **Optimizer**: Analyzes and optimizes bytecode (inlining, constant folding, dead-code elimination).
3. **Obfuscator**: Renames classes, fields, and methods with short, meaningless names (e.g. `a.b.c()`), making reverse-engineering difficult.
4. **Preverifier**: Adds preverification information to classes for faster Android runtime verification.

---

## 2. Configuration Breakdown

### A. Optimization & Stack Trace Preservation
```proguard
-optimizationpasses 5
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable
```
- Performs 5 passes of bytecode optimization.
- Retains line numbers in stack traces while obscuring exact file paths to enable crash analysis via mapping files.

### B. WebView & JavaScript Bridge Protection
```proguard
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
```
- Preserves methods marked with `@JavascriptInterface`. If these are obfuscated or stripped, the React frontend cannot invoke native bridge operations (such as audio speech or hardware sensors).

### C. Cloud Firestore & Play Services
```proguard
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**
```
- Protects Firebase models, reflection handlers, and serialization annotations (`@PropertyName`, `@ServerTimestamp`, `@Exclude`) from being renamed or stripped.

### D. Security Hardening: Log Stripping
```proguard
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
}
```
- Automatically removes `Log.v()`, `Log.d()`, and `Log.i()` statements from release binaries to prevent accidental information leakage through Android `logcat`.

---

## 3. How to Enable in `build.gradle`

In your Android module `build.gradle` (or Capacitor Android project):

```groovy
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
}
```
