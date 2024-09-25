import { useUser } from "@repo/shared-logic/hooks";
import { ApiProvider } from "@repo/shared-logic/providers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import ky from "ky";
import { StyleSheet, Text, View } from "react-native";

const api = ky.create({
  prefixUrl: process.env.EXPO_PUBLIC_API_URL,
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
    },
  },
});

const App = () => {
  return (
    <ApiProvider kyInstance={api}>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          <User id={1} />
          <User id={2} />
          <User id={3} />

          <StatusBar style="auto" />
        </View>
      </QueryClientProvider>
    </ApiProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

type UserProps = {
  readonly id: number;
};

const User = ({ id }: UserProps) => {
  const userQuery = useUser(id);

  if (userQuery.isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>User {id}</Text>

      <Text>Name: {userQuery.data?.name}</Text>
      <Text>Email: {userQuery.data?.email}</Text>
    </View>
  );
};
