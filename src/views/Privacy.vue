<template>
  <div class="privacy">
    <div class="hero">
      <div class="nav">
        <router-link to="/">
          <img src="../assets/white-logo.svg" alt=""
        /></router-link>

        <div class="links">
          <router-link to="/signin" v-if="!isLoggedIn">
            <button class="main-btn">
              Log in
            </button></router-link
          >
          <router-link v-else to="/dashboard/report">
            <button class="main-btn">
              Go Home
            </button>
          </router-link>
        </div>
      </div>

      <div class="hero-data">
        <div class="hero-text">
          <p class="big utb">
            Privacy Ploicy
          </p>
        </div>
      </div>
    </div>
    <div class="privacy-body">
      <p class="title">
        Introduction
      </p>
      <p class="text">
        This Privacy Policy will help you better understand how we collect, use,
        and share your personal information. If we change our privacy practices,
        we may update this privacy policy. If any changes are significant, we
        will let you know (for example, through the leyyow admin or by email).
      </p>
      <p class="sub-title">
        Our values
      </p>
      <p class="text">
        Trust is the foundation of the leyyow platform and includes trusting us
        to do the right thing with your information. Three main values guide us
        as we develop our products and services. These values should help you
        better understand how we think about your information and privacy.
      </p>
      <ul>
        <li>
          <p class="heading">
            Your information belongs to you
          </p>
          <p class="text">
            We carefully analyze what types of information we need to provide
            our services, and we try to limit the information we collect to only
            what we really need. Where possible, we delete or anonymize this
            information when we no longer need it. When building and improving
            our products, our engineers work closely with our privacy and
            security teams to build with privacy in mind. In all of this work
            our guiding principle is that your information belongs to you, and
            we aim to only use your information to your benefit.
          </p>

          <p class="heading">
            We protect your information from others
          </p>
          <p class="text">
            If a third party requests your personal information, we will refuse
            to share it unless you give us permission or we are legally
            required. When we are legally required to share your personal
            information, we will tell you in advance, unless we are legally
            forbidden.
          </p>

          <p class="heading">
            We help merchants and partners meet their privacy obligations
          </p>
          <p class="text">
            Many of the merchants and partners using leyyow do not have the
            benefit of a dedicated privacy team, and it is important to us to
            help them meet their privacy obligations. To do this, we try to
            build our products and services so they can easily be used in a
            privacy-friendly way. We also provide detailed FAQs, documentation
            and whitepapers covering the most important privacy topics, and
            respond to privacy-related questions we receive.
          </p>
        </li>
      </ul>

      <p class="title">
        Why we process your information
      </p>
      <p class="text">
        We generally process your information when we need to do so to fulfill a
        contractual obligation (for example, to process your subscription
        payments to use the leyyow platform), or where we or someone we work
        with needs to use your personal information for a reason related to
        their business (for example, to provide you with a service). European
        law calls these reasons “legitimate interests.” These “legitimate
        interests” include:
      </p>
      <ul>
        <li>
          preventing risk and fraud
        </li>
        <li>
          answering questions or providing other types of support
        </li>
        <li>
          helping merchants find and use apps through our app store
        </li>
        <li>
          providing and improving our products and services
        </li>
        <li>
          providing reporting and analytics
        </li>
        <li>
          testing out features or additional services
        </li>
        <li>
          assisting with marketing, advertising, or other communications
        </li>
      </ul>
      <p class="text">
        We only process personal information for these “legitimate interests”
        after considering the potential risks to your privacy—for example, by
        providing clear transparency into our privacy practices, offering you
        control over your personal information where appropriate, limiting the
        information we keep, limiting what we do with your information, who we
        send your information to, how long we keep your information, or the
        technical measures we use to protect your information.
      </p>
      <p class="title">
        Your rights over your information
      </p>
      <p class="text">
        We believe you should be able to access and control your personal
        information no matter where you live. Depending on how you use leyyow,
        you may have the right to request access to, correct, amend, delete,
        port to another service provider, restrict, or object to certain uses of
        your personal information (for example, direct marketing). We will not
        charge you more or provide you with a different level of service if you
        exercise any of these rights.
      </p>
      <p class="text">
        If you buy something from a leyyow-powered store and wish to exercise
        these rights over information about your purchase, you need to directly
        contact the merchant you interacted with. We are only a processor on
        their behalf, and cannot decide how to process their information. As
        such, we can only forward your request to them to allow them to respond.
        We will of course help our merchants to fulfill these requests by giving
        them the tools to do so and by answering their questions.
      </p>
      <p class="text">
        Please note that if you send us a request relating to your personal
        information, we have to make sure that it is you before we can respond.
        In order to do so, we may ask to see documentation verifying your
        identity, which we will discard after verification.
      </p>
      <p class="text">
        If you would like to designate an authorized agent to exercise your
        rights for you, please email us from the email address we have on file
        for you. If you email us from a different email address, we cannot
        determine if the request is coming from you and will not be able to
        accommodate your request. In your email, please include the name and
        email address of your authorized agent.
      </p>
      <p class="title">
        How we protect your information
      </p>
      <p class="text">
        Our teams work tirelessly to protect your information, and to ensure the
        security and integrity of our platform. We also have independent
        auditors assess the security of our data storage and systems that
        process financial information. However, we all know that no method of
        transmission over the Internet, and method of electronic storage, can be
        100% secure. This means we cannot guarantee the absolute security of
        your personal information
      </p>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      let token = window.sessionStorage.getItem("iam_cart_token");
      return token;
    },
  },
};
</script>
<style lang="scss" scoped>
.privacy {
  .hero {
    height: 380px;
    width: 100%;
    background: #10102c;
    .nav {
      padding: 0 130px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      height: 72px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .links {
        span {
          margin: 0 10px;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
        }
        .close {
          display: none;
        }
      }
      .menu {
        display: none;
      }
      .main-btn {
        height: 40px;
        padding: 0 12px;
      }
    }
    .hero-data {
      display: flex;
      flex-direction: row;
      .hero-text {
        padding: 120px 60px 50px 130px;
        width: 100%;
        text-align: center;
        .big {
          font-size: 48px;
          line-height: 120%;
          color: #ffffff;
          margin-bottom: 12px;
          margin-bottom: 30px;
        }
        .sm {
          font-size: 18px;
          line-height: 160%;
          color: rgba(255, 255, 255, 0.8);
          width: 50%;
          margin-left: 25%;
          margin-bottom: 0;
        }
        .line-btn {
          background: rgba(248, 232, 182, 0.1);
          border: 2px solid #f8e8b6;
          border-radius: 4px;
          color: #f8e8b6;
        }
        button {
          height: 45px;
          padding: 0 40px;
          margin-right: 10px;
        }
      }
      .hero-img {
        width: 50%;
        img {
          width: 450px;
          margin-top: 100px;
        }
      }
    }
  }
  .privacy-body {
    text-align: left;
    padding: 30px 200px;
    line-height: 150%;
    .title {
      font-size: 40px;
      font-weight: 600;
      margin-top: 100px;
    }
    .sub-title,
    .heading {
      font-size: 18px;
      font-weight: 600;
    }
  }
  @media (max-width: 767px) {
    .hero {
      height: auto;
      min-height: 300px;
      .nav {
        padding: 0 20px;
      }
      .hero-data .hero-text {
        padding: 30px 100px;
        .sm {
          width: 100%;
          margin: 0;
        }
      }
    }
    .privacy-body {
      padding: 30px 20px;
      .title {
        line-height: 50px;
      }
      .text {
        font-size: 16px;
        line-height: 26px;
      }
      .sub-title {
        margin-top: 35px;
      }
    }
  }
}
</style>
