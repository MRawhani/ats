<template>
  <div class="home">
    <div class="page-title">
      <h1 class="title">
        Apply
      </h1>
    </div>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Applying for </b>&nbsp;Accountant Engineer <b>Job </b>
          <h5>
            <b-icon icon="map-marker" custom-size="default" />
            Taiz
          </h5>
        </div>
      </notification>
      <card-component title="Forms" icon="ballot">
        <form @submit.prevent="submit">
          <b-field label="Basic" horizontal>
            <b-field>
              <b-input
                v-model="form.first_name"
                icon="account"
                placeholder="First Name"
                name="first_name"
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="form.last_name"
                icon="account"
                placeholder="Last Name"
                name="last_name"
                required
              />
            </b-field>
          </b-field>

          <b-field horizontal>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  +967
                </a>
              </p>
              <b-input
                v-model="form.phone"
                type="tel"
                name="phone"
                expanded
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="form.email"
                icon="email"
                type="email"
                placeholder="E-mail"
                name="email"
                required
              />
            </b-field>
          </b-field>
          <b-field horizontal>
            <b-field>
              <b-select
                v-model="form.gender"
                placeholder="Select a Gender"
                required
                expanded
              >
                <option
                  v-for="(gender, index) in genders"
                  :key="index"
                  :value="gender"
                >
                  {{ gender }}
                </option>
              </b-select>
            </b-field>
            <b-field>
              <b-input
                v-model="form.city"
                icon="home"
                placeholder="City"
                name="city"
                required
              />
            </b-field>
          </b-field>
          <hr />
          <b-field label="Job" horizontal>
            <b-field>
              <b-input
                v-model="form.last_job_title"
                icon="account"
                placeholder="Most Recent Job"
                name="last_job_title"
                required
              />
            </b-field>
            <b-field>
              <b-input
                v-model="form.last_job_employer"
                icon="account"
                placeholder="Last Employer"
                name="last_job_employer"
                required
              />
            </b-field>
          </b-field>
          <b-field horizontal>
            <b-field>
              <b-input
                v-model="form.total_experience"
                icon="account"
                type="number"
                placeholder="Total Years Of Experience"
                name="total_experience"
                required
              />
            </b-field>
            <b-field>
              <b-select
                v-model="form.english_language_fluency"
                placeholder="English language Fluency"
                name="english_language_fluency"
                required
                expanded
              >
                <option
                  v-for="(level, index) in fluency"
                  :key="index"
                  :value="level"
                >
                  {{ level }}
                </option>
              </b-select>
            </b-field>
          </b-field>
          <hr />
          <b-field horizontal label="CV">
            <file-picker v-model="form.file" accept="image/*" />
          </b-field>
          <hr />
          <b-field
            label="Why We should Accept you"
            message="Max 255 characters"
            horizontal
          >
            <b-input
              v-model="form.reason_to_hire"
              type="textarea"
              placeholder="Why"
              maxlength="255"
              required
            />
          </b-field>
          <hr />
          <b-field label="Screening Questions" class="has-check" horizontal>
            <radio-picker
              v-model="form.worked_same_before"
              :options="{ yes: 'Yes', no: 'No' }"
            >
              <h3>Are You in Taiz?</h3>
            </radio-picker>
          </b-field>
          <b-field horizontal>
            <radio-picker
              v-model="form.worked_same_before"
              :options="{ yes: 'Yes', no: 'No' }"
            >
              <h3>Do you have 5 years of Experience?</h3>
            </radio-picker>
          </b-field>
          <hr />
          <b-field horizontal>
            <div class="control">
              <button
                type="submit"
                class="button is-primary"
                :class="{ 'is-loading': isLoading }"
              >
                Submit
              </button>
            </div>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Notification from "@/components/Notification";
import CardComponent from "@/components/CardComponent";
// import CheckboxPicker from "@/components/CheckboxPicker";
import RadioPicker from "@/components/RadioPicker";
import FilePicker from "@/components/FilePicker";
export default {
  name: "Home",
  components: {
    Notification,
    FilePicker,
    RadioPicker,

    CardComponent
  },
  data() {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        first_name: null,
        last_name: null,
        phone: null,
        email: null,
        gender: null,
        City: null,
        last_job_title: null,
        last_job_employer: null,
        total_experience: null,
        english_language_fluency: null,
        last_education: null,
        major: null,
        file: null,
        worked_same_before: null,
        reside: null,
        reason_to_hire: null
      },
      genders: ["Male", "Female"],
      fluency: ["Excellent", "Good", "Weak"],
      education: ["PHD", "Master", "Bachlor", "Secondary"]
    };
  },
  computed: {
    ...mapState(["userName", "userEmail"])
  },
  watch: {
    userName(newValue) {
      this.form.name = newValue;
    },
    userEmail(newValue) {
      this.form.email = newValue;
    }
  },

  methods: {
    submit() {
      console.log(this.form.file);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        this.$store.commit("user", this.form);
        this.$buefy.snackbar.open({
          message: "Updated",
          queue: false
        });
      }, 500);
    }
  }
};
</script>
