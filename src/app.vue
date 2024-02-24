<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useMainStore } from "@/store";
import { useBem } from "@/utilities/bem";
import { getCompletionsWithAssistant, createThread } from "@/api/assistant";

export default defineComponent({
  name: "App",
  setup() {
    const bem = useBem("App");
    const store = useMainStore();
    const chatDisplay = ref(null);
    const userInput = ref("");
    const messages = reactive([
      {
        text: "Hallo, ich bin Ihr Kreuzfahrtschiff-Assistent. Wie kann ich Ihnen helfen?",
        author: "assistant",
      },
    ]);

    onMounted(async () => {
      console.log("onMounted");

      await createThread();
    });

    const sendRequest = async () => {
      if (userInput.value === "") {
        return;
      }

      messages.push({
        text: userInput.value,
        author: "user",
      });

      await getCompletionsWithAssistant(userInput.value).then((res) => {
        if (res) {
          messages.push({
            text: res.data[0].content[0].text.value,
            author: "assistant",
          });
        }
      });

      userInput.value = "";
    };
    return { bem, chatDisplay, userInput, messages, sendRequest, store };
  },
});
</script>

<template>
  <main :class="bem()" @keypress.enter="sendRequest">
    <div :class="bem('chat')">
      <header :class="bem('chatHeader')">
        <img
          :class="bem('chatHeaderImage')"
          alt="Vue logo"
          src="@/assets/logo.jpg"
        />
        <p :class="bem('chatHeaderText')">Finden Sie Ihr bestes Schiff!</p>
      </header>

      <section :class="bem('chatDisplay')">
        <div :class="bem('chatDisplayMessages')">
          <div :class="bem('container')">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="
                bem('message', [
                  message.author === 'assistant' ? 'assistant' : 'user',
                ])
              "
            >
              <font-awesome-icon
                :icon="message.author === 'assistant' ? 'robot' : 'user'"
              />
              <span
                :class="
                  bem(message.author === 'assistant' ? 'assistant' : 'user')
                "
              >
                {{ message.text }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section :class="bem('chatInput')">
        <textarea
          v-model="userInput"
          :class="bem('textarea')"
          placeholder="Hier Frage eingeben ... "
          rows="1"
          maxlength="270"
          required
        />

        <button :class="bem('button')" @click="sendRequest">
          Schiff finden
          <font-awesome-icon :class="bem('svgIcon')" icon="paper-plane" />
        </button>
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
/* define App */
.App {
  height: 100%;
  margin: 0 auto;
  max-width: 1024px;
  width: 100%;

  &-chat {
    height: 100%;

    &Header {
      align-items: center;
      display: flex;
      gap: 16px;
      flex-direction: row;
      justify-content: flex-start;
      padding: 16px;

      &Image {
        height: 100px;
      }
    }

    &Display {
      display: flex;
      flex-direction: column;
      height: calc(100% - 326px);
      padding: 0 16px 0;
      text-align: left;

      &Messages {
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        flex: 1 1;
        height: 100%;
        padding: 16px;
        overflow: hidden;
      }
    }

    &Input {
      align-items: center;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      display: flex;
      gap: 16px;
      padding: 8px 16px;
      margin: 8px 16px;
    }
  }

  &-container {
    overflow: scroll;
  }

  &-message {
    display: flex;
    gap: 8px;
    margin: 8px 0;

    &--assistant {
      align-items: flex-end;
    }

    &--user {
      align-items: flex-end;
      justify-content: flex-end;
    }
  }

  &-assistant {
    background-color: #1e2b57;
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    border-bottom-left-radius: 0;
  }

  &-user {
    background-color: #f2f2f2;
    padding: 8px 16px;
    justify-content: flex-end;
    border-radius: 8px;
    border-bottom-left-radius: 0;
  }

  &-textarea {
    border-width: 0;
    box-sizing: border-box;
    overflow: hidden;
    overflow-wrap: break-word;
    text-align: start;
    outline: 2px solid transparent;
    outline-offset: 2px;
    padding: 0;
    resize: none;
    width: 100%;
  }

  &-button {
    align-items: center;
    background-color: #1e2b57;
    border: none;
    border-radius: 4px;
    color: white;
    display: flex;
    gap: 16px;
    justify-content: center;
    float: right;
    height: 48px;
    max-width: 138px;
    width: 100%;
  }

  &-svgIcon {
    width: 16px;
  }
}
</style>
