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
      <h1 className="text-3xl font-bold mb-6 text-gray-200">Skapa ditt CV</h1>

      <div className="w-full max-w-2xl space-y-6">
        <section className="bg-gray-600 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-400">Personlig information</h2>
          <div className="grid gap-3">
            {["name", "title", "email"].map((key) => (
              <input
                key={key}
                placeholder={key}
                className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
        </section>

        <section className="bg-gray-600 shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-400">Erfarenheter</h2>
          <div className="grid gap-3">
            <input
              placeholder="Jobbtitel (t.ex. Frontendutvecklare)"
              className="border rounded-lg p-3"
              value={currentExp.role}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, role: e.target.value })
              }
            />
            <input
              placeholder="År (t.ex. 2021–2024)"
              className="border rounded-lg p-3"
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
            <input 
              placeholder="Tekniska färdigheter (t.ex. React, Node.js)"
              className="border rounded-lg p-3"
              value={currentExp.stack}
              onChange={(e) =>
                setCurrentExp({ ...currentExp, stack: e.target.value })
              }
            />
            <button
              type="button"
              onClick={addExperience}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Lägg till erfarenhet
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {formData.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-3 bg-gray-50 shadow-sm"
              >
                <p className="font-semibold">
                  {exp.role} – <span className="text-gray-600">{exp.year}</span>
                </p>
                <p className="text-sm text-gray-700">{exp.description}</p>
                <p className="text-sm text-gray-400">{exp.stack}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-600 shadow rounded-xl p-6 grid gap-3">
          <h2 className="text-lg font-semibold mb-4 text-gray-400">Utbildning & färdigheter</h2>
          <input
            placeholder="Utbildning"
            className="border rounded-lg p-3"
            value={formData.education}
            onChange={(e) =>
              setFormData({ ...formData, education: e.target.value })
            }
          />
          <input
            placeholder="Färdigheter"
            className="border rounded-lg p-3"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
        </section>

        <div className="flex justify-center">
          <PDFDownloadLink
            document={<MyCV data={formData} />}
            fileName={PDF_FILE_NAME}
          >
            {({ loading }) => (
              <button 
                disabled={isFormEmpty} 
                className={`bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 shadow ${isFormEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? "Genererar PDF..." : "Exportera som PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </main>
  );
}
