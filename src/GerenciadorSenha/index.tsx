import Constants from "expo-constants";
import { useState } from "react";
import { Button, ScrollView, TextInput } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Picker } from "@react-native-picker/picker";
import * as yup from "yup";
import { Feather } from '@expo/vector-icons';

const validationSchema = yup.object().shape({
  tamanhoSenha: yup
    .number()
    .min(8, "Minimo de 8 caracteres")
    .max(48, "Maximo de 48 caracteres")
    .required('O campo é obrigatório'),
  tipo: yup
    .string()
    .required('O campo é obrigatório'),
});

interface FormTypes {
  tamanhoSenha: number;
  tipo: string;
}

const valoresIniciais: FormTypes = {
  tamanhoSenha: 0,
  tipo: "",
};

export default function GeradorSenha() {
  const [senha, setSenha] = useState("");

  function gerenciadorSenha(tamanhoSenha: number, tipo: string) {
    let senha = "";
    let charsLista = "";
    switch (tipo) {
      case "charsTodos":
        charsLista = charsTodos;
        break;

      case "charsLetrasNumeros":
        charsLista = charsLetrasNumeros;
        break;

      case "charsLetras":
        charsLista = charsLetras;
        break;

      case "charsEspeciais":
        charsLista = charsEspeciais;
        break;

      case "charsNumeros":
        charsLista = charsNumeros;
        break;

      case "charsMaiusculo":
        charsLista = charsMaiusculo;
        break;

      case "charsMinusculo":
        charsLista = charsMinusculo;
        break;

      default:
        charsLista = charsTodos;
        break;
    }
    for (var i = 0; i < tamanhoSenha; i++) {
      var numeroAleatorio = Math.floor(Math.random() * charsLista.length);
      senha += charsLista.substring(numeroAleatorio, numeroAleatorio + 1);
    }
    return senha;
  }

  function onSubmitForm(values: FormTypes) {
    const texto = gerenciadorSenha(values.tamanhoSenha, values.tipo);
    setSenha(texto);
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.titulo}>Gerador de Senha</Text>
      </View>
      <StatusBar style="dark" backgroundColor="cadetblue" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Feather name="lock" size={48} color="black" />
          </View>
          <Formik
            initialValues={valoresIniciais}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, resetForm, values, errors }) => (
              <View>
                <View style={styles.senhaContainer}>
                  <Text>Resultado</Text>
                  <Text style={styles.senha}>
                    {(senha === "") ? "********" : senha}
                  </Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Text>Tamanho da senha</Text>
                  <TextInput
                    onChangeText={handleChange('tamanhoSenha')}
                    onBlur={handleBlur('tamanhoSenha')}
                    value={(values.tamanhoSenha === 0) ? "" : values.tamanhoSenha.toString()}
                    style={[styles.input]}
                    placeholder="Quantidade de caracteres"
                    keyboardType="numeric"
                  />
                  {errors.tamanhoSenha && <Text style={{ color: "red" }}>{errors.tamanhoSenha}</Text>}
                </View>
                <View style={{ marginBottom: 16 }}>
                  <Text>Tipo</Text>
                  <View style={styles.selectContainer}>
                    <Picker
                      selectedValue={values.tipo}
                      onValueChange={(itemValue, itemIndex) => setFieldValue("tipo", itemValue)}
                      style={styles.select}
                    >
                      {listaTipo.map((item, index) => {
                        return (
                          <Picker.Item label={item.label} value={item.value} key={index} />
                        );
                      })}
                    </Picker>
                  </View>
                  {errors.tipo && <Text style={{ color: "red" }}>{errors.tipo}</Text>}
                </View>
                <Button title="Gerar" color="blue" onPress={() => handleSubmit()} />
                <Button title="Limpar" color="red" onPress={() => {
                  setSenha("");
                  resetForm();
                }} />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "cadetblue",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: Constants.statusBarHeight,
  },
  titulo: {
    fontSize: 20,
  },
  container: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "column"
  },
  input: {
    borderWidth: 1,
    padding: 10,
  },
  senhaContainer: {
    marginVertical: 8,
    borderWidth: 1,
    padding: 10,
  },
  senha: {
    textAlign: "center",
    fontSize: 22,
  },
  selectContainer: {
    borderWidth: 1,
  },
  select: {
    width: "100%",
    height: 50,
  },
  logoContainer: {
    alignItems: "center",
    padding: 20,
  }
});

const listaTipo = [
  { label: "Selecione", value: "" },
  { label: "Todos", value: "charsTodos" },
  { label: "Letras e Numeros", value: "charsLetrasNumeros" },
  { label: "Letras", value: "charsLetras" },
  { label: "Especiais", value: "charsEspeciais" },
  { label: "Numeros", value: "charsNumeros" },
  { label: "Maiusculo", value: "charsMaiusculo" },
  { label: "Minusculo", value: "charsMinusculo" },
];

const charsTodos = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@#$%^&*()+?><:{}[]";
const charsLetrasNumeros = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
const charsLetras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
const charsEspeciais = "!@#$%^&*()+?><:{}[]";
const charsNumeros = "0123456789";
const charsMaiusculo = "ABCDEFGHIJLMNOPQRSTUVWXYZ";
const charsMinusculo = "abcdefghijklmnopqrstuvwxyz";
