<template>
  <div class="home">
    <section class="">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Applied for </b>&nbsp;{{ job_title }}
          
          <h5>
            <b-icon icon="update" custom-size="default" />
            {{ formatDate(applicant.created_at) }}
          </h5>
        </div>
      </notification>
      <!-- <embed
        src="https://www.tinaja.com/glib/pdflink.pdf"
        width="800px"
        height="2100px"
      /> -->
       <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
            <div
                slot="trigger" 
                slot-scope="props"
                class="card-header"
                role="button"
                aria-controls="contentIdForA11y3">
                <p class="card-header-title">
                    View Cv
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                      <iframe
        src="https://www.tinaja.com/glib/pdflink.pdf"
        style="width: 100%; height: 500px"
        frameborder="0"
      ></iframe>
                </div>
            </div>
           
        </b-collapse>
   

      <!-- <object
        src="https://www.tinaja.com/glib/pdflink.pdf"
        width="500"
        height="375"
        type="application/pdf"
      /> -->
      <card-component title="Personal Info" icon="ballot">
        <br />

        <b-field label="Basic" horizontal>
          <b-field>
            <b-input
              v-model="applicant.first_name"
              icon="account"
              placeholder="First Name"
              name="first_name"
              required
              disabled
            />
          </b-field>
          <b-field>
            <b-input
              v-model="applicant.last_name"
              icon="account"
              placeholder="Last Name"
              name="last_name"
              required
              disabled
            />
          </b-field>
        </b-field>

        <b-field horizontal>
          <b-field>
            <b-input
              v-model="applicant.phone"
              type="tel"
              name="phone"
               icon="phone"
              disabled
              required
            />
          </b-field>
          <b-field>
            <b-input
              v-model="applicant.email"
              icon="email"
              type="email"
              placeholder="E-mail"
              name="email"
              disabled
              required
            />
          </b-field>
        </b-field>
        <b-field horizontal>
          <b-field>
            <b-input
              name="city"
              icon="gender-male-female"
              v-model="genders[applicant.gender - 1]"
              placeholder="Select a Gender"
              required
              expanded
              disabled
            />
          </b-field>
          <b-field>
            <b-input
              :value="getCity(applicant.city).name"
              icon="google-maps"
              placeholder="City"
              name="city"
              required
              disabled
            />
          </b-field>
        </b-field>
        <hr />
      </card-component>
      <card-component title="Education" icon="ballot">
        <br />
        <template v-for="(edu, index) in applicant.education">
          <div v-bind:key="index">
            <b-field :label="`${index + 1}`" horizontal>
              <b-field label=" School">
                <b-input v-model="edu.school" required disabled />
              </b-field>
              <b-field label=" Major">
                <b-input v-model="edu.major" required disabled />
              </b-field>
            </b-field>

            <b-field horizontal>
              <b-field label="Level">
                <b-input
                  :value="getEducation_level(edu.level).name"
                  required
                  disabled
                />
              </b-field>
              <b-field label="Finshed Date">
                <b-input
                  :value="formatDate(edu.completed_at)"
                  required
                  disabled
                />
              </b-field>
            </b-field>

            <hr />
          </div>
        </template>
      </card-component>
      <card-component title="Experiences" icon="ballot">
        <br />
        <template v-for="(exp, index) in applicant.experience">
          <div v-bind:key="index">
            <b-field :label="`${index + 1}`" horizontal>
              <b-field label="Company">
                <b-input v-model="exp.company_name" required disabled />
              </b-field>
              <b-field label="Job Role">
                <b-input
                  :value="getExperience_roles(exp.job_role).name"
                  required
                  disabled
                />
              </b-field>
            </b-field>
            <b-field horizontal>
              <b-tag type="is-info">{{
                getExperience_employment_status(exp.employment_status).name
              }}</b-tag>
            </b-field>
            <b-field horizontal>
              <b-field label="Company industry">
                <b-input
                  :value="getExperience_industries(exp.company_industry).name"
                  required
                  disabled
                />
              </b-field>
              <b-field label="Position">
                <b-input :value="exp.position" required disabled />
              </b-field>
            </b-field>
            <b-field horizontal>
              <b-field label="Start at">
                <b-input :value="formatDate(exp.start_at)" required disabled />
              </b-field>
              <b-field label="End At">
                <b-input :value="formatDate(exp.end_at)" required disabled />
              </b-field>
            </b-field>

            <hr />
          </div>
        </template>
      </card-component>
      <card-component title="Other Info" icon="ballot">
        <br />

        <b-field label="English Level" horizontal>
          <b-field>
            <b-input
              :value="getEn_level(applicant.en_level).name"
              required
              disabled
            />
          </b-field>
        </b-field>
         <b-field
            label="Skills"
            message="Applicant Skills"
            horizontal
            
          >
            <b-input
            
              type="textarea"
              :value="applicant.skills"
         class=" has-fixed-size"
              required
              disabled
            />
          </b-field>
        <!-- <b-field
          v-for="(skill, i) in skills"
          v-bind:key="i"
          :label="i === 0 ? 'Skills' : ''"
          horizontal
        >
          <b-field>
            <b-tag type="is-success">{{ skill }}</b-tag>
          </b-field>
        </b-field> -->
        <hr />
      </card-component>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Notification from "@/components/Notification";
import CardComponent from "@/components/CardComponent";
// import CheckboxPicker from "@/components/CheckboxPicker";
// import RadioPicker from "@/components/RadioPicker";
// import FilePicker from "@/components/FilePicker";
export default {
  name: "Home",
  components: {
    Notification,
    // FilePicker,
    // RadioPicker,

    CardComponent,
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
        reason_to_hire: null,
      },
      genders: ["Male", "Female"],
      fluency: ["Excellent", "Good", "Weak"],
      education: ["PHD", "Master", "Bachlor", "Secondary"],
    };
  },
  computed: {
    ...mapState(["userName", "userEmail"]),
    ...mapGetters([
      "getCity",
      "getEn_level",
      "getEducation_level",
      "getExperience_roles",
      "getExperience_industries",
      "getExperience_employment_status",
    ]),
    skills() {
      return this.applicant.skills.split(",");
    },
  },
  props: ["applicant", "job_title"],
  watch: {
    userName(newValue) {
      this.form.name = newValue;
    },
    userEmail(newValue) {
      this.form.email = newValue;
    },
    // applicant(){
    //     console.log(this.applicant);
    // }
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
          queue: false,
        });
      }, 500);
    },
  },
};
</script>
