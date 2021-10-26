<template>
  <div class="mx-4 my-2 elevation-1">
    <user-dialog
      v-model="showUserDialog"
      :userData="selectedUser"
      @submit="submit"
      @update="update"
    ></user-dialog>
    <v-dialog v-model="showRemoveDialog">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmDelete"
            >Delete</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-alert text prominent v-if="error" type="error" icon="mdi-cloud-alert">
      {{ error }}
    </v-alert>
    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>User Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" @click="openUserDialog">
            New User
          </v-btn>
        </v-toolbar>

        <v-text-field
          class="mx-2"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="openUserDialog({ user: item })">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteUser(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import NewUserDialog from "./NewUserDialog.vue";
import UserDialog from "./UserDialog.vue";
import UserType from "../types/user";
import userService from "../services/userService";

@Component({
  components: {
    NewUserDialog,
    UserDialog,
  },
})
export default class UserTable extends Vue {
  showUserDialog = false;

  showRemoveDialog = false;

  search = "";

  headers = [
    { text: "Name", value: "name" },
    { text: "Email", value: "email" },
    { text: "Age", value: "age" },
    { text: "Actions", value: "actions", sortable: false, filterable: false },
  ];

  users: UserType[] = [];

  error = "";

  fetchUsers(): void {
    userService.getUsers().then((response) => {
      this.error = "";
      if (!response.error && response.data) this.users = response.data;
      else this.error = response.message;
    });
  }

  mounted() {
    this.fetchUsers();
  }

  selectedUser: UserType | null = null;

  submit(value: UserType) {
    userService.createUser(value).then((response) => {
      this.error = "";
      this.showUserDialog = false;
      this.fetchUsers();
      if (response.error) this.error = response.message;
    });
  }

  update(value: UserType) {
    userService.updateUser(value).then((response) => {
      this.error = "";

      this.showUserDialog = false;
      this.fetchUsers();
      if (response.error) this.error = response.message;
    });
  }

  deleteUser(user: UserType) {
    this.selectedUser = user;
    this.showRemoveDialog = true;
  }

  cancelDelete() {
    this.showRemoveDialog = false;
    this.selectedUser = null;
  }

  confirmDelete() {
    if (this.selectedUser)
      userService.deleteUser(this.selectedUser._id).then((response) => {
        this.error = "";
        this.showRemoveDialog = false;
        this.fetchUsers();
        if (response.error) this.error = response.message;
      });
  }

  openUserDialog({ user }: { user?: UserType }) {
    if (user) {
      this.selectedUser = user;
    } else {
      this.selectedUser = null;
    }

    this.showUserDialog = true;
  }
}
</script>
