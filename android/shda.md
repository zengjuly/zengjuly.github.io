## What's SHDA?

Load cemare from screenlocked, the screen is black.
open applogcat, log is below:
```
12-15 20:34:35.160  1695  1888 D HwCust  : Create obj success use class android.telephony.HwCustSignalStrengthImpl
12-15 20:34:35.160  1014  1345 V WindowManager: addWindow: New client android.view.ViewRootImpl$W@c1e5b2c: window=Window{8bc69f5 u0 Splash Screen com.huawei.camera} Callers=com.android.server.wm.HwWindowManagerService.addWindow:535 com.android.server.wm.Session.addToDisplay:204 android.view.ViewRootImpl.setView:840 android.view.WindowManagerGlobal.addView:369 android.view.WindowManagerImpl.addView:129 
12-15 20:34:35.161  1682  2023 I ash     : allow ctrl sys app:[com.huawei.camera]
12-15 20:34:35.161  1682  2023 I ash     : com.huawei.camera pop from SHDA
```

