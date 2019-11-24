package com.company.Vizkard;

import android.app.Application;
import com.chirag.RNMail.RNMail;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import com.imagepicker.ImagePickerPackage; // <-- add this import
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line
import com.fetchsky.RNTextDetector.RNTextDetectorPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; 
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import com.brentvatne.react.ReactVideoPackage;
// import com.burnweb.rnwebview.RNWebViewPackage; 


import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNMail(),
            new RNFirebasePackage(),
            new VectorIconsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFirebaseDatabasePackage(),
            new ImagePickerPackage(),// <-- add this line
            new RNFirebaseStoragePackage(),
            new RNTextDetectorPackage(),
            new RNFirebaseMessagingPackage(),// <-- Add this line
            new RNFirebaseNotificationsPackage(),
            new ReactVideoPackage()
            // new RNWebViewPackage()
            // new RNFirebaseNotificationsPackage()
            // new RNFirebaseMessagingPackage(),
            // new RNFirebaseNotificationsPackage()
            // new RNFetchBlobPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
