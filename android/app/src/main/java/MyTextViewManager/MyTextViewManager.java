package MyTextViewManager;

import android.graphics.Color;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by wwez on 2017/3/24.
 */

public class MyTextViewManager extends SimpleViewManager<TextView> {
    @Override
    public String getName(){
        return "MyTextView";
    }
    @Override
    protected TextView createViewInstance(final ThemedReactContext reactContext) {
        final TextView textView=new TextView(reactContext);
        textView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                if(motionEvent.getAction()==MotionEvent.ACTION_DOWN)
                {
                    WritableMap nativeEvent= Arguments.createMap();
                    nativeEvent.putString("message", "MyMessage");
                    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(textView.getId(), "topChange",nativeEvent
                    );
                    return true;
                }else
                {
                    return  false;
                }
            }
        });
        return textView;
    }
    @ReactProp(name = "text")
    public void setText(TextView view, String text) {
        view.setText(text);
    }

    @ReactProp(name = "textSize")
    public void setTextSize(TextView view, float fontSize) {
        view.setTextSize(fontSize);
    }

    @ReactProp(name = "textColor", defaultInt = Color.RED)
    public void setTextColor(TextView view, int textColor) {
        view.setTextColor(textColor);
    }

    @ReactProp(name = "isAlpha", defaultBoolean = false)
    public void setTextAlpha(TextView view, boolean isAlpha) {
        if (isAlpha) {
            view.setAlpha(0.5f);
        }
    }
}
