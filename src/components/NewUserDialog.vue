<template>
  <v-dialog v-model="isDialogOpen" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        New User
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">New User</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-col>
            <v-row>
              <v-text-field
                v-model="currentUser.name"
                label="Name"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                type="email"
                v-model="currentUser.email"
                label="Email"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                type="number"
                v-model="currentUser.age"
                label="Age"
              ></v-text-field>
            </v-row>
          </v-col>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import UserType from "../types/user";

@Component
export default class NewUserDialog extends Vue {
  @Prop() userData!: UserType;

  @Prop() onSubmit: (value: UserType) => void;

  isDialogOpen = false;

  currentUser = this.userData || {
    name: "",
    email: "",
    age: null,
  };

  close() {
    console.log(this.userData);
    this.isDialogOpen = false;
  }

  save() {
    console.log("saved with", this.currentUser);
    this.$emit("submit", this.currentUser);
  }
}
</script>

<style></style>
