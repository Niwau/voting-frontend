import { FieldValues, Path, Control, useController } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
}

export const Input = <T extends FieldValues>({
  control,
  name,
  ...rest
}: InputProps<T>) => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const hasError = !!fieldState.error?.message;

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        value={field.value}
        onChangeText={field.onChange}
        error={hasError}
        {...rest}
      />
      <HelperText type="error" visible={hasError}>
        {fieldState.error?.message}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
