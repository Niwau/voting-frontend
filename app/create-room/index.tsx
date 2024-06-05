import { useFieldArray, useForm } from "react-hook-form";
import { StyleSheet, View, Alert } from "react-native";
import { Text, Button, TextInput, HelperText } from "react-native-paper";
import { Input } from "../../src/components/Input";
import { ScreenContainer } from "../../src/components/ScreenContainer";
import { Footer } from "../../src/components/Footer";
import { createRoomSchema, CreateRoomSchema } from "../../src/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { socket } from "../../src/api/api";

export default function CreateRoom() {
  const { control, handleSubmit, formState } = useForm<CreateRoomSchema>({
    defaultValues: {
      theme: "Tema Teste",
      options: [
        {
          value: "Opção 1",
        },
        {
          value: "Opção 2",
        },
      ],
    },
    resolver: zodResolver(createRoomSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = handleSubmit(async ({ theme, options }) => {
    const payload = {
      theme,
      options: options.map((option) => option.value),
    };

    socket.emit("room:create", payload, (response) => {
      if (!response.success) {
        Alert.alert("Erro", response.message);
        return;
      }
      router.push(`/room/${response.code}`);
    });
  });

  const canAddOption = fields.length < 5;

  const addOption = () => {
    append({ value: "" });
  };

  return (
    <ScreenContainer>
      <View style={styles.formContainer}>
        <Input name="theme" label="Tema" control={control} />
        <View style={styles.optionsHeader}>
          <Text variant="titleLarge">Opções</Text>
          <HelperText type="error" visible={!!formState.errors.options}>
            {formState.errors.options?.message}
          </HelperText>
        </View>
        <View>
          {fields.map((field, index) => (
            <View key={field.id}>
              <Input
                right={
                  <TextInput.Icon
                    icon="delete"
                    forceTextInputFocus={false}
                    onPress={() => remove(index)}
                  />
                }
                control={control}
                name={`options.${index}.value`}
                label={`Opção ${index + 1}`}
              />
            </View>
          ))}
        </View>
        {canAddOption && (
          <Button icon="plus" onPress={addOption} mode="contained">
            Adicionar
          </Button>
        )}
      </View>
      <Footer>
        <Button mode="contained" onPress={onSubmit}>
          Criar Sala
        </Button>
      </Footer>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    gap: 8,
  },
  optionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
