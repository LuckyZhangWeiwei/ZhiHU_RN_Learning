package com.reactnativelearning;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.views.webview.ReactWebViewManager;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import NativeModule.MyNativeModule;
import MyTextViewManager.MyTextViewManager;
import swiprefresh.ReactSwipeRefreshLayoutManager;
import webView.MyReactWebViewManager;

/**
 * Created by wwez on 2017/3/23.
 */

public class CustomReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> result = new ArrayList<ViewManager>();
        result.add(new MyTextViewManager());
        result.add(new MyReactWebViewManager());
        result.add(new ReactSwipeRefreshLayoutManager());
        return result;
    }
}