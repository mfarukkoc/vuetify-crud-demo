<template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ newUser ? "New User" : "Update User" }}</span>
      </v-card-title>

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="save">
          <v-card-text>
            <v-container>
              <v-col>
                <v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="name"
                    rules="required|alphaSpaces"
                    class="flex-grow-1"
                  >
                    <v-text-field
                      v-model="currentUser.name"
                      :error-messages="errors"
                      label="Name"
                      required
                    ></v-text-field>
                  </validation-provider>
                </v-row>
                <v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                    class="flex-grow-1"
                  >
                    <v-text-field
                      type="text"
                      v-model="currentUser.email"
                      :error-messages="errors"
                      label="Email"
                    ></v-text-field>
                  </validation-provider>
                </v-row>
                <v-row>
                  <validation-provider
                    v-slot="{ errors }"
                    name="age"
                    rules="required|numeric"
                    class="flex-grow-1"
                  >
                    <v-text-field
                      type="number"
                      v-model="currentUser.age"
                      :error-messages="errors"
                      label="Age"
                    ></v-text-field>
                  </validation-provider>
                </v-row>
              </v-col>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text type="submit" :disabled="invalid">
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import {
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
  extend,
} from "vee-validate";
import {
  required,
  email,
  alpha_spaces as alphaSpaces,
  numeric,
  min,
} from "vee-validate/dist/rules";

import UserType from "../types/user";

extend("required", required);
extend("email", email);
extend("alphaSpaces", alphaSpaces);
extend("numeric", numeric);

setInteractionMode("eager");

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class UserDialog extends Vue {
  @Prop() value: boolean;

  @Prop() userData!: UserType;

  @Prop() onSubmit: (value: UserType) => void;

  @Prop() onUpdate: (value: UserType) => void;

  newUser = this.userData === null;

  currentUser = { ...this.userData } || {
    name: "",
    email: "",
    age: null,
  };

  @Watch("userData")
  onUserDataChanged(val: UserType, oldVal: UserType) {
    this.newUser = val === null;
    this.currentUser = { ...val } || {
      _id: "",
      name: "",
      email: "",
      age: null,
    };
  }

  get isDialogOpen(): boolean {
    return this.value;
  }

  set isDialogOpen(value: boolean) {
    this.$emit("input", value);
  }

  close() {
    this.currentUser = {
      _id: "",
      name: "",
      email: "",
      age: 0,
    };
    this.isDialogOpen = false;
  }

  save() {
    if (this.newUser) this.$emit("submit", this.currentUser);
    else this.$emit("update", this.currentUser);
  }
}
</script>
