package webView;

import android.content.Context;
import android.util.AttributeSet;
import android.util.Log;
import android.webkit.WebView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by wwez on 2017/4/8.
 */

public class RTCWebView extends WebView {
    public RTCWebView(Context context) {
        super(context);
    }

    public RTCWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public RTCWebView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    protected void onScrollChanged(int l, int t, int oldl, int oldt) {
        super.onScrollChanged(l, t, oldl, oldt);
        Log.e("TAG","onScrollChanged");
        WritableMap event = Arguments.createMap();
        event.putInt("ScrollX", l);
        event.putInt("ScrollY", t);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(), "topChange", event);
    }
}