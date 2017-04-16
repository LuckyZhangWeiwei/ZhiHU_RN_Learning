package swiprefresh.event;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by wwez on 2017/4/14.
 */

public class RefreshEvent extends Event<RefreshEvent> {

    public static final String EVENT_NAME = "topSwipeRefresh";
    public RefreshEvent(int viewTag) {
        super(viewTag);
    }
    @Override
    public String getEventName() {
        return EVENT_NAME;
    }
    @Override
    public short getCoalescingKey() {
        return 0;
    }
    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), Arguments.createMap());
    }
}
