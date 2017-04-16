package webView;

import android.support.annotation.Nullable;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by wwez on 2017/4/8.
 */

public class MyReactWebViewManager extends SimpleViewManager<WebView> {
    public static final String REACT_CLASS = "RCTWebView";
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        WebView webView= new RTCWebView(reactContext);
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        return webView;
    }


    @ReactProp(name = "url")
    public void setUrl(WebView view,@Nullable String url) {
        Log.e("TAG", "setUrl");
        view.loadUrl(url);
    }
    @ReactProp(name = "html")
    public void setHtml(WebView view,@Nullable String html) {
        Log.e("TAG", "setHtml");
        view.loadData(html, "text/html; charset=utf-8", "UTF-8");
    }
}