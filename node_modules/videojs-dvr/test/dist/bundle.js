(function (QUnit,sinon,videojs) {
'use strict';

QUnit = QUnit && QUnit.hasOwnProperty('default') ? QUnit['default'] : QUnit;
sinon = sinon && sinon.hasOwnProperty('default') ? sinon['default'] : sinon;
videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var empty = {};


var empty$1 = Object.freeze({
	default: empty
});

var minDoc = ( empty$1 && empty ) || empty$1;

var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {};


var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

var document_1 = doccy;

var version = "1.4.0";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};











var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// Default options for the plugin.
var defaults = {
  startTime: 0,
  timeLive: 60 * 60
};

var timeLive = 0;
var customTime = defaults.timeLive;

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');
var ProgressControl = videojs.getComponent('ProgressControl');
var SeekBar = ProgressControl.getComponent('SeekBar');
var PlayProgressBar = ProgressControl.getComponent('PlayProgressBar');
var MouseTimeDisplay = videojs.getComponent('MouseTimeDisplay');
var LoadProgressBar = ProgressControl.getComponent('LoadProgressBar');

LoadProgressBar.prototype.update = function (event) {

  var buffered = this.player_.buffered();
  var duration = this.player_.duration();
  var bufferedEnd = this.player_.bufferedEnd();
  var children = this.partEls_;

  // get the percent width of a time compared to the total end
  var percentify = function percentify(time, end) {

    var percent = time / end || 0;

    return (percent >= 1 ? 1 : percent) * 100 + '%';
  };

  // update the width of the progress bar
  if (percentify(bufferedEnd, duration) !== 0) {
    this.el_.style.width = percentify(bufferedEnd, duration);
  }

  // add child elements to represent the individual buffered time ranges
  for (var i = 0; i < buffered.length; i++) {
    var start = buffered.start(i);
    var end = buffered.end(i);
    var part = children[i];

    if (!part) {
      part = this.el_.appendChild(document_1.createElement('div'));
      children[i] = part;
    }

    if (percentify(start, bufferedEnd) !== 0) {
      // set the percent based on the width of the progress bar (bufferedEnd)
      part.style.left = percentify(start, bufferedEnd);
    }

    if (percentify(end - start, bufferedEnd) !== 0) {
      part.style.width = percentify(end - start, bufferedEnd);
    }
  }

  // remove unused buffered range elements
  for (var _i = children.length; _i > buffered.length; _i--) {
    this.el_.removeChild(children[_i - 1]);
  }

  children.length = buffered.length;
};

SeekBar.prototype.update_ = function (currentTime, percent) {

  var duration = this.player_.duration();
  var time = this.player_.scrubbing() ? this.player_.getCache().currentTime : this.player_.currentTime();

  // machine readable value of progress bar (percentage complete)
  this.el_.setAttribute('aria-valuenow', (percent * 100).toFixed(2));

  // human readable value of progress bar (time complete)
  /*
  this.el_.setAttribute('aria-valuetext',
    this.localize('progress bar timing: currentTime={1} duration={2}',
      [formatTime(currentTime, duration),
        formatTime(duration, duration)],
      '{1} of {2}'));
   */
  // console.log(duration - time, duration);
  if (duration !== Number.POSITIVE_INFINITY) {
    this.el_.setAttribute('aria-valuetext', '-' + videojs.formatTime(duration - time, duration));
  }
  // Update the `PlayProgressBar`.
  this.bar.update(videojs.dom.getBoundingClientRect(this.el_), percent);
};

SeekBar.prototype.handleMouseMove = function (event) {

  var calculate = 1 - this.calculateDistance(event);

  var newTime2 = this.player_.seekable().end(0) - calculate * customTime;

  // Don't let video end while scrubbing.
  if (newTime2 === this.player_.duration()) {
    newTime2 = newTime2 - 0.1;
  }

  // Set new time (tell player to seek to new time)
  this.player_.currentTime(newTime2);

  this.update();
};

PlayProgressBar.prototype.update = function update(seekBarRect, seekBarPoint) {
  var _this = this;

  var duration = this.player_.duration();

  // If there is an existing rAF ID, cancel it so we don't over-queue.
  if (this.rafId_) {
    this.cancelAnimationFrame(this.rafId_);
  }

  this.rafId_ = this.requestAnimationFrame(function () {

    var time = _this.player_.scrubbing() ? _this.player_.getCache().currentTime : _this.player_.currentTime();

    var content = videojs.formatTime(duration - time, duration);

    if (seekBarPoint !== 0 && duration !== Number.POSITIVE_INFINITY) {
      _this.getChild('timeTooltip').update(seekBarRect, seekBarPoint, '-' + content);
    }
  });
};

MouseTimeDisplay.prototype.update = function update(seekBarRect, seekBarPoint) {
  var _this2 = this;

  // If there is an existing rAF ID, cancel it so we don't over-queue.
  if (this.rafId_) {
    this.cancelAnimationFrame(this.rafId_);
  }

  this.rafId_ = this.requestAnimationFrame(function () {

    var content2 = videojs.formatTime(customTime - seekBarPoint * customTime, customTime);

    _this2.el_.style.left = seekBarRect.width * seekBarPoint + 'px';

    if (seekBarPoint !== 0 && _this2.player_.duration() !== Number.POSITIVE_INFINITY) {
      _this2.getChild('timeTooltip').update(seekBarRect, seekBarPoint, '-' + content2);
    }
  });
};

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {

  player.addClass('vjs-dvr');

  player.controlBar.addClass('vjs-dvr-control-bar');

  var Slider = player.controlBar.progressControl.seekBar.__proto__;

  Slider.__proto__.update = function update() {

    if (!this.el_) {
      return;
    }

    var progress = void 0;

    progress = this.name_ === 'VolumeBar' ? this.getPercent() : 1 - (this.player_.duration() - this.player_.currentTime()) / customTime;

    var bar = this.bar;

    if (!bar) {
      return;
    }

    // Protect against no duration and other division issues
    if (typeof progress !== 'number' || progress !== progress || progress < 0 || progress === Infinity) {
      progress = 0;
    }

    if (progress > 1) {
      progress = 1;
    }

    // Convert to a percentage for setting
    var percentage = (progress * 100).toFixed(2) + '%';
    var style = bar.el().style;

    if (progress !== 0) {
      if (this.vertical()) {
        style.height = percentage;
      } else {
        style.width = percentage;
      }
    }

    return progress;
  };

  if (player.controlBar.progressControl) {
    player.controlBar.progressControl.addClass('vjs-dvr-progress-control');
  }

  player.controlBar.liveButton = player.controlBar.addChild('liveButton');

  player.controlBar.el().insertBefore(player.controlBar.liveButton.el(), player.controlBar.progressControl.el());
};

var onTimeUpdate = function onTimeUpdate(player, e) {

  var time = player.seekable();

  if (!time || !time.length) {
    return;
  }

  if (time.end(0) - player.currentTime() < 20) {
    player.controlBar.liveButton.addClass('onair');
  } else {
    player.controlBar.liveButton.removeClass('onair');
  }

  player.duration(player.seekable().end(0));

  if (!timeLive) {
    timeLive = customTime = player.seekable().end(0);
  }
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function dvr
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var dvr = function dvr(options) {
  var _this3 = this;

  if (!options) {
    options = defaults;
  }

  this.on('timeupdate', function (e) {
    onTimeUpdate(_this3, e);
  });

  this.on('pause', function (e) {
    _this3.controlBar.liveButton.removeClass('onair');
  });

  this.ready(function () {
    onPlayerReady(_this3, videojs.mergeOptions(defaults, options));
  });
};

/**
 * Button to seek forward to the current time.
 *
 * @extends Button
 */

var LiveButton = function (_Button) {
  inherits(LiveButton, _Button);

  /**
   * Creates an instance of this class.
   *
   * @param {Player} player
   *        The Video.js `Player` object that this class should be attached to.
   *
   * @param {Object} [options]
   *        An object containing options for the button.
   */
  function LiveButton(player, options) {
    classCallCheck(this, LiveButton);

    var _this4 = possibleConstructorReturn(this, _Button.call(this, player, options));

    _this4.el().innerHTML = '<span class="liveCircle"></span><span class="liveText">LIVE</span>';
    if (!player.paused()) {
      _this4.addClass('onair');
    }
    return _this4;
  }

  /**
   * Builds the default DOM `className`.
   *
   * @return {string}
   *         The DOM `className` for this object.
   */


  LiveButton.prototype.buildCSSClass = function buildCSSClass() {
    return 'vjs-live-button ' + _Button.prototype.buildCSSClass.call(this);
  };

  /**
   * Handles a button click.
   *
   * @param {EventTarget~Event} [event]
   *        The event that caused this function to be called.
   *
   * @listens tap
   * @listens click
   */


  LiveButton.prototype.handleClick = function handleClick(event) {
    var currentTime = this.player_.seekable().end(0);

    this.player_.currentTime(currentTime);
    this.player_.play();
  };

  return LiveButton;
}(Button);

Component.registerComponent('LiveButton', LiveButton);

// Register the plugin with video.js.
registerPlugin('dvr', dvr);

// Include the version number.
dvr.VERSION = version;

var Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof sinon === 'undefined' ? 'undefined' : _typeof(sinon), 'object', 'sinon exists');
  assert.strictEqual(typeof videojs === 'undefined' ? 'undefined' : _typeof(videojs), 'function', 'videojs exists');
  assert.strictEqual(typeof dvr === 'undefined' ? 'undefined' : _typeof(dvr), 'function', 'plugin is a function');
});

QUnit.module('videojs-dvr', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document_1.getElementById('qunit-fixture');
    this.video = document_1.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },
  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function (assert) {
  assert.expect(2);

  assert.strictEqual(_typeof(Player.prototype.dvr), 'function', 'videojs-dvr plugin was registered');

  this.player.dvr();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(2);

  assert.ok(this.player.hasClass('vjs-dvr'), 'the plugin adds a class to the player');
});

}(QUnit,sinon,videojs));
