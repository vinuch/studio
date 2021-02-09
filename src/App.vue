<template>
  <div id="app">
    <a-alert
      message="Success"
      :description="message"
      type="success"
      show-icon
      v-if="showAlert && alertType === 'success'"
    />
    <a-alert
      message="Information"
      :description="message"
      type="info"
      show-icon
      v-if="showAlert && alertType === 'info'"
    />
    <a-alert
      message="Warning"
      :description="message"
      type="warning"
      show-icon
      v-if="showAlert && alertType === 'warn'"
    />
    <a-alert
      message="Error"
      :description="message"
      type="error"
      show-icon
      v-if="showAlert && alertType === 'error'"
    />
    <router-view />
  </div>
</template>

<script>
import { EventBus } from "./services/eventBus";
export default {
  data() {
    return {
      showAlert: false,
      alertType: "",
      message: "",
    };
  },
  mounted() {
    EventBus.$on("open_alert", (type, message) => {
      // console.log({ type, message });
      this.showAlert = true;
      this.alertType = type;
      this.message = message;
      setTimeout(() => {
        this.showAlert = false;
        this.alertType = "";
        this.message = "";
      }, 6000);
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: untitled-sans-regular;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  box-sizing: border-box;
}

button {
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.5;
  }
}

.main-btn {
  background: #3a50d5 !important;
  border: 1px solid #3a50d5 !important;
  border-radius: 4px !important;
  color: #fff !important;
  font-family: untitled-sans-medium;
  font-size: 16px !important;
}

.main-btn-bd {
  background: #fff !important;
  border: 2px solid #3a50d5 !important;
  border-radius: 4px !important;
  color: #3a50d5 !important;
  font-family: untitled-sans-medium;
  font-size: 16px !important;
}
.blue__text {
  color: #3a50d5;
}

.ant-drawer-header {
  padding: 0 !important;
  border: 0 !important;
}

//alerts
.ant-alert-with-description {
  width: 300px !important;
  position: absolute !important;
  top: 5px !important;
  right: 5px !important;
  z-index: 121212222 !important;
  text-align: left !important;
  transition: linear all 0.3s;
}

// overrides
.register {
  .ant-select {
    margin-bottom: 20px !important;
    .ant-select-selection {
      border: 1px solid #e6e9ef !important;
      border-radius: 4px !important;
      padding: 0 20px !important;
      height: 56px !important;
    }
    .ant-select-selection__placeholder,
    .ant-select-search__field__placeholder {
      height: 45px !important;
      line-height: 45px !important;
      left: -10px !important;
    }
  }
}

.report {
  .pick {
    width: 120px !important;
    float: right !important;
  }
}
.ant-tabs-nav .ant-tabs-tab {
  color: #8093ad !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: untitled-sans-medium !important;
}
.ant-tabs-nav .ant-tabs-tab-active {
  color: #3a50d5 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  font-family: untitled-sans-medium !important;
}
.ant-tabs-ink-bar {
  background-color: #3a50d5 !important;
  height: 3px !important;
}
.ant-drawer-body {
  padding-bottom: 0 !important;
}

.input__container {
  border: 1px solid #e6e9ef !important;
  box-sizing: border-box;
  border-radius: 4px !important;
  padding: 0 20px !important;
  margin-bottom: 20px;
}
.input__container.input__container--content
  .label__active.label__active--canscale {
  font-size: 16px !important;
  font-weight: 500;
  font-family: untitled-sans-regular !important;
}
.input__container .slot-container {
  position: relative;
}
.input__container .slot-container input,
.input__container .slot-container textarea,
.input__container .slot-container select {
  font-size: 16px !important;
  line-height: 20px !important;
  color: #2b2b2b !important;
  font-family: untitled-sans-regular !important;
  font-weight: 600 !important;
  // top: -5px;
  // margin-top: -6px !important;
  padding-top: 5px !important;
}
.input__container .slot-container select:focus {
  outline: none;
}
label.label__placeholder {
  left: 20px !important;
}

.input__container.has-line[data-v-19d0ca9f]:after,
.input__container.has-line .character-counter-container[data-v-19d0ca9f]:after {
  height: 0 !important;
  display: none !important;
}

@media (max-width: 767px) {
  .report {
    .pick {
      width: 120px !important;
      float: left !important;
      margin-top: 12px !important;
      margin-bottom: 40px !important;
    }
  }
}
</style>
