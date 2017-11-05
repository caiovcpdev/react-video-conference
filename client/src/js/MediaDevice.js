import _ from 'lodash';
import Emitter from './Emitter';

/**
 * Manage all media devices
 */
class MediaDevice extends Emitter {
  /**
   * Start media devices and send stream
   */
  start() {
    const constraints = {
      video: {
        facingMode: 'user',
        height: { min: 360, ideal: 720, max: 1080 }
      },
      audio: true
    };

    navigator.getUserMedia(constraints, (stream) => {
      this.stream = stream;
      this.emit('stream', stream);
    }, err => console.log(err));
    return this;
  }
  /**
   * Turn on/off a device
   * @param {String} type - Type of the device
   * @param {Boolean} [on] - State of the device
   */
  toggle(type, on) {
    const len = arguments.length;
    this.stream[`get${type}Tracks`]().forEach((track) => {
      const state = len === 2 ? on : !track.enabled;
      _.set(track, 'enabled', state);
    });
    return this;
  }

  /**
   * Stop all media track of devices
   */
  stop() {
    this.stream.getTracks().forEach(track => track.stop());
    return this;
  }
}

export default MediaDevice;
