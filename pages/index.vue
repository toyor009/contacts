<template>
  <v-container>
    <v-progress-circular
      v-if="isLoading"
      width="2"
      color="rs__primary"
      indeterminate
    />

    <v-card v-else>
      <v-data-table
        :headers="headers"
        :items="contacts"
        :search="search"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>My Contacts</v-toolbar-title>

            <v-divider class="mx-4" inset vertical />

            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search for contact"
              class="mt-5 d-none d-sm-inline"
            />

            <v-spacer />

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add New Contact
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.firstName"
                          label="Firstname"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.lastName"
                          label="Lastname"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.phoneNumber"
                          label="Phone Number"
                          type="number"
                          placeholder="+91 0123 456 7899"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="saveContact">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h6"
                  >Are you sure you want to delete this contact?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="showEditDialog(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="showDeleteDialog(item)">
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: "",

    headers: [
      { text: "Firstname", value: "firstName", align: "start" },
      { text: "Lastname", value: "lastName" },
      { text: "Phone Number", value: "phoneNumber", sortable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],

    editedIndex: -1,

    editedItem: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },

    defaultItem: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    }
  }),

  computed: {
    ...mapState(["contacts", "loadingStatus"]),

    isEditMode() {
      return this.editedIndex > -1;
    },

    formTitle() {
      return this.isEditMode ? "Edit Contact Details" : "Add New Contact";
    },

    isLoading() {
      return this.loadingStatus === "LOADING";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      await this.$store.dispatch("fetchContacts");
    },

    showEditDialog(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    showDeleteDialog(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteContact(this.editedIndex);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveContact() {
      const { firstName, phoneNumber } = this.editedItem;
      if (!firstName || !phoneNumber) {
        this.close();
        return;
      }

      if (this.isEditMode) {
        this.updateContact(this.editedItem, this.editedIndex);
      } else {
        this.addNewContact(this.editedItem);
      }

      this.close();
    },

    async addNewContact(newContact) {
      await this.$store.dispatch("addNewContact", newContact);
    },

    async updateContact(details, index) {
      await this.$store.dispatch("updateContactDetails", {
        details,
        index
      });
    },

    async deleteContact(index) {
      await this.$store.dispatch("deleteContact", index);
    }
  }
};
</script>

<style lang="sass" scoped>
.v-progress-circular
  position: absolute
  top: 40%
  left: 50%
</style>
