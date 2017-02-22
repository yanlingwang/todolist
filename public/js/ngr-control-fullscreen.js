'use strict';

NGR.Control.Fullscreen = NGR.Control.extend({
  includes: [NGR.Mixin.Events],

  options: {
    position: 'topright',
    requestFullscreenTitle: '全屏查看',
    exitFullscreenTitle: '退出全屏'
  },

  onAdd: function onAdd(map) {
    var container = NGR.DomUtil.create('div', 'ngr-control-fullscreen ngr-bar ngr-control');
    this._map = map;
    this._el = container;

    this.link = NGR.DomUtil.create('a', 'ngr-control-fullscreen-button ngr-bar-part', container);
    this.link.href = '#';

    this._map.on('fullscreenchange', this._toggleTitle, this);
    this._toggleTitle();

    NGR.DomEvent.on(this.link, 'click', this._click, this);

    return container;
  },
  onRemove: function onRemove() {
    this._el.parentNode.removeChild(this._el);
    this._map = null;
    return this;
  },
  _click: function _click(e) {
    NGR.DomEvent.stopPropagation(e);
    NGR.DomEvent.preventDefault(e);
    this._map.toggleFullscreen(this.options);
  },
  _toggleTitle: function _toggleTitle() {
    var _options = this.options,
        requestFullscreenTitle = _options.requestFullscreenTitle,
        exitFullscreenTitle = _options.exitFullscreenTitle;

    this.link.title = this._map.isFullscreen() ? exitFullscreenTitle : requestFullscreenTitle;
  }
});

NGR.Map.include({
  isFullscreen: function isFullscreen() {
    return this._isFullscreen || false;
  },
  toggleFullscreen: function toggleFullscreen(options) {
    this.controlOptions = options;
    var container = options.container || this.getContainer();
    /* eslint-disable no-lonely-if */
    if (options && options.pseudoFullscreen) {
      if (this.isFullscreen()) {
        this._disablePseudoFullscreen(container);
      } else {
        this._enablePseudoFullscreen(container);
      }
    } else {
      if (this.isFullscreen()) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.mozRequestFullScreen) {
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) {
          container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
      }
    }
    /* eslint-enable no-lonely-if */
  },
  _enablePseudoFullscreen: function _enablePseudoFullscreen(container) {
    NGR.DomUtil.addClass(container, 'ngr-control-fullscreen-pseudo');
    this._setFullscreen();
    this.fire('fullscreenchange');
  },
  _disablePseudoFullscreen: function _disablePseudoFullscreen(container) {
    NGR.DomUtil.removeClass(container, 'ngr-control-fullscreen-pseudo');
    this._setFullscreen(false);
    this.invalidateSize();
    this.fire('fullscreenchange');
  },
  _setFullscreen: function _setFullscreen() {
    var fullscreen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this._isFullscreen = fullscreen;
    var container = this.controlOptions.container || this.getContainer();
    var fullscreen = document.getElementsByClassName("ngr-control-fullscreen-button")[0];
    if (fullscreen) {
      NGR.DomUtil.addClass(container, 'ngr-fullscreen-on');
      NGR.DomUtil.addClass(fullscreen,"disable-fullscreen");
    } else {
      NGR.DomUtil.removeClass(container, 'ngr-fullscreen-on');
      NGR.DomUtil.removeClass(fullscreen,"disable-fullscreen");
    }
  },
  _onFullscreenChange: function _onFullscreenChange() {
    var container = this.controlOptions.container || this.getContainer();
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

    if (fullscreenElement === container && !this._isFullscreen) {
      this._setFullscreen();
      this.fire('fullscreenchange');
    } else if (fullscreenElement !== container && this._isFullscreen) {
      this._setFullscreen(false);
      this.fire('fullscreenchange');
    }
  }
});

NGR.Map.mergeOptions({
  fullscreenControl: false
});

NGR.Map.addInitHook(function () {
  var _this = this;

  var enableFullscreenControl = this.options.fullscreenControl;
  if (enableFullscreenControl) {
    this.fullscreenControl = new NGR.Control.Fullscreen(enableFullscreenControl);
    this.addControl(this.fullscreenControl);
  }

  var fullscreenchange = void 0;

  if ('onfullscreenchange' in document) {
    fullscreenchange = 'fullscreenchange';
  } else if ('onmozfullscreenchange' in document) {
    fullscreenchange = 'mozfullscreenchange';
  } else if ('onwebkitfullscreenchange' in document) {
    fullscreenchange = 'webkitfullscreenchange';
  } else if ('onmsfullscreenchange' in document) {
    fullscreenchange = 'MSFullscreenChange';
  }

  if (fullscreenchange) {
    (function () {
      var onFullscreenChange = NGR.bind(_this._onFullscreenChange, _this);

      _this.whenReady(function () {
        return NGR.DomEvent.on(document, fullscreenchange, onFullscreenChange);
      });

      _this.on('unload', function () {
        return NGR.DomEvent.off(document, fullscreenchange, onFullscreenChange);
      });
    })();
  }
});

NGR.control.fullscreen = function (options) {
  return new NGR.Control.Fullscreen(options);
};
