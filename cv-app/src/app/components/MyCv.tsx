import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 12, borderBottom: "1px solid #000", paddingBottom: 2 },
  header: { fontSize: 18, marginBottom: 5, fontWeight: "bold", textTransform: "uppercase" },
  subHeader: { fontSize: 14, marginBottom: 3, fontWeight: "semibold", textTransform: "uppercase" },
  expItem: { marginBottom: 6 },
  expTitle: { fontSize: 12, fontWeight: "bold" },
  expDescription: { fontSize: 10 },
});

const MyCV = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>{data.name}</Text>
        <Text>{data.title}</Text>
        <Text>{data.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Profil</Text>
        <Text>{data.introduction}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Erfarenhet</Text>
        {data.experiences.map((exp: any, idx: number) => (
          <View key={idx} style={styles.expItem}>
            <Text>{exp.role} ({exp.year})</Text>
            <Text style={styles.expDescription}>{exp.description}</Text>
            <Text style={styles.expDescription}>{exp.stack}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Utbildning</Text>
        <Text>{data.education}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Färdigheter</Text>
        <Text>{data.skills}</Text>
      </View>
    </Page>
  </Document>
);

export default MyCV;