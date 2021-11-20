import Vuex from "vuex";

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      contacts: [],
      loadingStatus: "IDLE"
    }),

    mutations: {
      SET_LOADING_STATUS(state, status) {
        state.loadingStatus = status;
      },

      SET_REQUEST_STATUS(state, requestName, status) {
        state.requestStatus[requestName] = status;
      },

      SET_CONTACTS(state, contacts) {
        state.contacts = contacts;
      },

      ADD_NEW_CONTACT(state, newContact) {
        state.contacts.unshift(newContact);
      },

      UPDATE_CONTACT_DETAILS(state, contactInfo) {
        Object.assign(state.contacts[contactInfo.index], contactInfo.details);
      },

      DELETE_CONTACT(state, contactIndex) {
        state.contacts.splice(contactIndex, 1);
      }
    },

    actions: {
      fetchContacts(context) {
        context.commit("SET_LOADING_STATUS", "LOADING");
        this.$axios.get("contacts.json").then(response => {
          context.commit("SET_CONTACTS", response.data);
          context.commit("SET_LOADING_STATUS", "IDLE");
        });
      },

      addNewContact(context, newContact) {
        context.commit("ADD_NEW_CONTACT", newContact);
      },

      updateContactDetails(context, contactInfo) {
        context.commit("UPDATE_CONTACT_DETAILS", contactInfo);
      },

      deleteContact(context, contactIndex) {
        context.commit("DELETE_CONTACT", contactIndex);
      }
    }
  });
};

export default createStore;
