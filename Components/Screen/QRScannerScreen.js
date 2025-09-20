import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async({ data }) => {
    setScanned(true);
    setLoading(true);

    try{
      const response = await fetch("http://192.168.109.149:5000/check-voter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voterId: data }),
      });

      const result = await response.json();
      setLoading(false);
      if (result.success) {
        navigation.navigate("FaceVerification", { qrData: data });
      } else {
        Alert.alert("Verification failed", result.message);
      }
    } catch (error) {
      console.error("Error verifying QR code:", error);
      setLoading(false);
      Alert.alert("Error", `An error occurred while verifying the QR code: ${error.message}`);
    }
  };

  if (!permission) return <Text>Loading permissions...</Text>;
  if (!permission.granted) return <Text>Camera permission denied</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {/* Overlay UI */}
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.instructions}>
          Scan the QR code at your voting center
        </Text>

        {loading && <Text style={styles.loadingText}>Verifying...</Text>}

        {scanned && !loading && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "#4630EB",
    borderRadius: 16,
  },
  instructions: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  rescanButton: {
    backgroundColor: "#4630EB",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  rescanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scanButton: {
    backgroundColor: "violet",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  scanButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
  },
  loadingText: {
    color: "white",
    fontSize: 18,
    marginTop: 16,
  },
});
