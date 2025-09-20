import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

export default function QRScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("FaceVerification", { qrData: data });
    }, 1000); // simulate verification delay
  };

  if (!permission) return <Text>Loading permissions...</Text>;
  if (!permission.granted) return <Text>Camera permission denied</Text>;

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onModernBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        isCameraActive={!scanned}
      />

      {/* Overlay UI */}
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.instructions}>
          Scan the QR code at your voting center
        </Text>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            navigation.navigate("FaceVerification"); // simulate scanning
          }}
        >
          <Text style={styles.scanButtonText}>Simulate Scan</Text>
        </TouchableOpacity>

        {loading && <Text style={styles.loadingText}>Verifying...</Text>}

        {scanned && !loading && (
          <TouchableOpacity
            style={styles.rescanButton}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close-circle" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanButton: {
  backgroundColor: 'violet',
  paddingHorizontal: 20,
  paddingVertical: 12,
  borderRadius: 8,
  marginTop: 20,
},
scanButtonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
},
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
