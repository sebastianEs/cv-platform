// app/page.tsx
"use client";

import { useState } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Header from "./components/Header";
import TextField from "./components/TextField";
import Card from "./components/Cards";
import List from "./components/List";
import Button from "./components/Button";
import Head from "next/head";

const PDF_FILE_NAME = "resume.pdf";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 12 },
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
        <Text>
          {data.email}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Profil</Text>
        <Text>{data.introduction}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Erfarenhet</Text>
        {data.experiences.map((exp: any, idx: number) => (
          <View key={idx} style={styles.expItem}>
            <Text>
              {exp.role} ({exp.year})
            </Text>
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

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    education: "",
    skills: "",
    introduction: "",
    experiences: [] as { role: string; year: string; description: string, stack: string }[],
  });

  const [currentExp, setCurrentExp] = useState({
    role: "",
    year: "",
    description: "",
    stack: ""
  });

  const addExperience = () => {
    if (currentExp.role && currentExp.year && currentExp.description) {
      setFormData({
        ...formData,
        experiences: [...formData.experiences, currentExp],
      });
      setCurrentExp({ role: "", year: "", description: "", stack: "" });
    }
  };

  const isFormEmpty = !formData.name && !formData.title && !formData.email && !formData.education && !formData.skills && formData.experiences.length === 0;

  return (
    <main className="flex flex-col items-center p-8 bg-gray-900 min-h-screen">
      <Header text="Skapa ditt CV" variant="h1" className="text-3xl font-bold mb-6 text-gray-200" />

      <div className="w-full max-w-2xl space-y-6">
        <Card>
          <Header variant="h2" text="Personlig information" className="text-lg font-semibold mb-4 text-gray-400" />
          <div className="grid gap-3">
            {["name", "title", "email"].map((key) => (
              <TextField
                key={key}
                placeholder={key}
                value={formData[key as keyof typeof formData] as string}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
              />
            ))}
          </div>
          <div>
            <textarea
              placeholder="Kort introduktion om dig själv"
              className="border rounded-lg p-3 mt-4 w-full focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.introduction}
              onChange={(e) =>
                setFormData({ ...formData, introduction: e.target.value })
              }
            />
          </div>
        </Card>

        <Card>
          <Header variant="h2" text="Erfarenheter" className="text-lg font-semibold mb-4 text-gray-400" />
          <div className="grid gap-3">
            <TextField
              placeholder="Jobbtitel (t.ex. Frontendutvecklare)"
              value={currentExp.role}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, role: e.target.value })
              }
            />
            <TextField
              placeholder="År (t.ex. 2021–2024)"
              value={currentExp.year}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, year: e.target.value })
              }
            />
            <textarea
              placeholder="Beskrivning av erfarenhet"
              className="border rounded-lg p-3"
              value={currentExp.description}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, description: e.target.value })
              }
            />
            <TextField 
              placeholder="Tekniska färdigheter (t.ex. React, Node.js)"
              value={currentExp.stack}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, stack: e.target.value })
              }
            />
            
            <Button
              onClick={addExperience}
              title="Lägg till erfarenhet"
              size="medium"
              color="blue"
            />
            
          </div>

          <div className="mt-4 space-y-3">
            <List items={formData.experiences.map(exp => ({ ...exp, stack: exp.stack.split(',') }))} />
        
            
          </div>
        </Card>

        <Card>
          <Header variant="h2" text="Utbildning & färdigheter" className="text-lg font-semibold mb-4 text-gray-400" />
          <TextField
            placeholder="Utbildning"
            value={formData.education}
            onChange={(e) =>
              setFormData({ ...formData, education: e.target.value })
            }
          />
          <TextField
            placeholder="Färdigheter"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
        </Card>

        <div className="flex justify-center">
          <PDFDownloadLink
            document={<MyCV data={formData} />}
            fileName={PDF_FILE_NAME}
          >
            {({ loading }) => (
              <Button 
                title={loading ? "Genererar PDF..." : "Ladda ner CV som PDF"}
                disabled={isFormEmpty} 
                color="green"
                size="large"
                onClick={() => {}}
              />
                
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </main>
  );
}
