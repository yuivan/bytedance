//通过mousedown,mousemove,mouseup,  touchstart,touchmove,touchend实现统一的自定义事件，抹平pc端和移动端差异
/*
- start/move/end //兼容touch和move
- panstart/pan/panend

*/

function enableGesture(element) {
  let contexts = [];
  const mouse_type = Symbol("mouse");
  if (!("ontouchstart" in document)) {
    // PC 模拟手势的start,move,end
    element.addEventListener("mousedown", (event) => {
      let move = (event) => {
        onMove(event, contexts[mouse_type]);
      };
      let end = (event) => {
        onEnd(event, contexts[mouse_type]);
        document.removeEventListener("mousemove", move);
      };
      document.addEventListener("mousemove", move);
      contexts[mouse_type] = {};
      onStart(event, contexts[mouse_type]);
      document.addEventListener("mouseup", end, { once: true });
    });
  }
  element.addEventListener("touchstart", (event) => {
    //identifier 手指的number key
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = {};
      onStart(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener("touchmove", (event) => {
    const stop = () => {
      event.preventDefault();
    };
    for (let touch of event.changedTouches) {
      touch.stop = stop;
      onMove(touch, contexts[touch.identifier]);
    }
  });
  element.addEventListener("touchend", (event) => {
    for (let touch of event.changedTouches) {
      onEnd(touch, contexts[touch.identifier]);
      delete contexts[touch.identifier];
    }
  });
  //抹平差异之后的start,move,end,在里面触发自定义事件
  let onStart = (point, context) => {
    element.dispatchEvent(
      Object.assign(new CustomEvent("start"), {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        ClientY: point.clientY,
      })
    );
    context.startX = point.clientX;
    context.startY = point.clientY;
    context.isTap = true; // 点击
    context.isPan = false; // 滑屏
    context.isPress = false; // 长按
    context.timoutHandler = setTimeout(() => {
      if (context.isPan) return;
      context.isTap = false;
      context.isPress = true;
      element.dispatchEvent(
        Object.assign(new CustomEvent("pressstart"), {
          clientX: point.clientX,
          ClientY: point.clientY,
        })
      );
    }, 300);
  };
  let onMove = (point, context) => {
    let dx = point.clientX - context.startX;
    let dy = point.clientY - context.startY;
    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
      //发生移动就取消等待长按
      clearTimeout(context.timoutHandler);
      context.isTap = false;
      context.isPan = true;
      context.isPress = false;
      element.dispatchEvent(
        Object.assign(new CustomEvent("panstart"), {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          stop: point.stop,
        })
      );
      //已经触发了长按就取消长按
      if (context.isPress) {
        element.dispatchEvent(new CustomEvent("presscancel"));
      }
      return;
    }
    if (context.isPan) {
      element.dispatchEvent(
        Object.assign(new CustomEvent("pan"), {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          stop: point.stop,
        })
      );
    }
    element.dispatchEvent(
      Object.assign(new CustomEvent("move"), {
        clientX: point.clientX,
        clientY: point.clientY,
      })
    );
  };
  let onEnd = (point, context) => {
    //长按触发之前，end,就取消等待长按
    clearTimeout(context.timoutHandler);
    if (context.isPan) {
      element.dispatchEvent(
        Object.assign(new CustomEvent("panend"), {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
        })
      );
    }
    if (context.isTap) {
      element.dispatchEvent(
        Object.assign(new CustomEvent("tap"), {
          clientX: point.clientX,
          clientY: point.clientY,
        })
      );
    }
    if (context.isPress) {
      element.dispatchEvent(
        Object.assign(new CustomEvent("pressend"), {
          clientX: point.clientX,
          clientY: point.clientY,
        })
      );
    }
    element.dispatchEvent(
      Object.assign(new CustomEvent("end"), {
        clientX: point.clientX,
        clientY: point.clientY,
      })
    );
  };
}
