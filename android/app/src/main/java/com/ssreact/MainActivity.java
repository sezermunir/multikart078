package com.ssreact;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "SimpleRNApp"; // Burada uygulamanın JS tarafındaki component adı olacak
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
      this,
      getMainComponentName(),
      DefaultNewArchitectureEntryPoint.getFabricEnabled() // Fabric ayarı
    );
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // react-native-screens uyumluluğu için null gönderiyoruz
  }
}
