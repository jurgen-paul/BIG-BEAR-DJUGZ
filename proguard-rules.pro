# ==============================================================================
# ProGuard / R8 Configuration File: Big Bear Djugs Interactive Adventure
# Target: Android / Capacitor / WebView / Hybrid Bundle Minification & Obfuscation
# Compliance: OpenSSF Hardened Build Specification & NIST SP 800-218 SSDF
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. GENERAL OPTIMIZATION & SHRINKING SETTINGS
# ------------------------------------------------------------------------------
-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontskipnonpubliclibraryclassmembers
-verbose

# Preserve line numbers and source file names for meaningful stack traces
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable

# Preserve generic type signatures for runtime reflection and serialization
-keepattributes Signature
-keepattributes InnerClasses,EnclosingMethod

# Preserve annotations for framework validation and dependency injection
-keepattributes *Annotation*

# ------------------------------------------------------------------------------
# 2. WEBVIEW & JAVASCRIPT INTERFACE PRESERVATION
# Crucial for React Web app embedded inside Android WebView / Capacitor / Cordova
# ------------------------------------------------------------------------------
# Prevent obfuscation of JavascriptInterface methods exposed to Web client
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

-keepclassmembers class * extends android.webkit.WebViewClient {
    public void *(android.webkit.WebView, java.lang.String);
    public void *(android.webkit.WebView, android.webkit.WebResourceRequest, android.webkit.WebResourceResponse);
}

-keepclassmembers class * extends android.webkit.WebChromeClient {
    public void *(android.webkit.WebView, java.lang.String);
    public boolean *(android.webkit.WebView, android.webkit.ValueCallback, android.webkit.WebChromeClient$FileChooserParams);
}

# ------------------------------------------------------------------------------
# 3. FIREBASE & CLOUD FIRESTORE RULES
# Keeps Firestore serialization and security models intact
# ------------------------------------------------------------------------------
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# Keep Google Play services & Firebase models
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

# Keep data transfer models & POJOs used for Firestore serialization
-keepclassmembers class * {
    @com.google.firebase.firestore.PropertyName <fields>;
    @com.google.firebase.firestore.PropertyName <methods>;
    @com.google.firebase.firestore.Exclude <fields>;
    @com.google.firebase.firestore.Exclude <methods>;
    @com.google.firebase.firestore.ServerTimestamp <fields>;
}

# ------------------------------------------------------------------------------
# 4. JSON SERIALIZATION (GSON / MOSHI / JACKSON)
# ------------------------------------------------------------------------------
-keepclassmembers class * {
    @com.google.gson.annotations.SerializedName <fields>;
    @com.google.gson.annotations.Expose <fields>;
}

-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# ------------------------------------------------------------------------------
# 5. REMOVE DEBUG LOGGING IN PRODUCTION RELEASE BUILDS
# Enhances SSF security posture by preventing leak of sensitive runtime diagnostics
# ------------------------------------------------------------------------------
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
}

# ------------------------------------------------------------------------------
# 6. KOTLIN COROUTINES & SYSTEM RUNTIME
# ------------------------------------------------------------------------------
-dontwarn kotlinx.coroutines.**
-keepclassmembers class kotlinx.coroutines.** {
    volatile <fields>;
}

# ------------------------------------------------------------------------------
# 7. CAPACITOR / CORDOVA HYBRID PLUGINS (IF WRAPPED)
# ------------------------------------------------------------------------------
-keep public class * extends com.getcapacitor.Plugin
-keep public class * extends org.apache.cordova.CordovaPlugin
-keepclassmembers class * extends com.getcapacitor.Plugin {
    @com.getcapacitor.PluginMethod public void *(com.getcapacitor.PluginCall);
}
