// src/views/Dashboard/Pengaduan/components/FormPertanyaan.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertDescription, // Tambahkan ini
  Heading,
  Flex,
  useColorModeValue,
  useToast, // <<< === Tambahkan ini ===
  Spinner, // <<< === Tambahkan ini ===
} from "@chakra-ui/react";
import Select from 'react-select';

function FormPertanyaan({ onClose }) {
  const toast = useToast(); // <<< === Inisialisasi useToast ===

  const [formData, setFormData] = useState({
    // ==== IDENTITAS PENANYA (Nama field disesuaikan dengan snake_case Laravel) ====
    nama: "",
    email: "",
    tanggal_lahir: "", // <<< === Sesuaikan nama kolom Laravel ===
    jenis_kelamin: null, // <<< === Tetap null untuk react-select ===
    alamat: "",
    provinsi: null, // <<< === 'propinsi' menjadi 'provinsi' untuk konsistensi Laravel ===
    kabupaten: null, // <<< === 'kabupatenKota' menjadi 'kabupaten' ===
    kode_pos: "", // <<< === Sesuaikan nama kolom Laravel ===
    telpon_hp: "", // <<< === 'teleponHp' menjadi 'telpon_hp' ===
    no_identitas: "", // <<< === Sesuaikan nama kolom Laravel ===
    topik: "",
    jenis_pertanyaan: null, // <<< === 'jenisPertanyaan' menjadi 'jenis_pertanyaan' ===
    uraian_pertanyaan: "", // <<< === 'uraian' menjadi 'uraian_pertanyaan' ===
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false); // <<< === State loading untuk submit ===
  const [generalError, setGeneralError] = useState(null); // Menggunakan nama yang konsisten

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Opsi Jenis Kelamin
  const jenisKelaminOptions = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' }
  ];

  // Opsi Jenis Pertanyaan
  const jenisPertanyaanOptions = [
    { value: '', label: 'Pilih Jenis Pertanyaan' },
    { value: 'Alat Ukur', label: 'Alat Ukur' },
    { value: 'Timbangan dan Perlengkapan', label: 'Timbangan dan Perlengkapan' },
    { value: 'Takar', label: 'Takar' }
  ];

  // ==============================================================================================
  // BAGIAN STYLE REACT-SELECT DAN FETCHING DATA PROVINCE/REGENCY DARI API PUBLIK
  // KODE INI SAMA DENGAN DUA FORM SEBELUMNYA.
  // ==============================================================================================

  const chakraBg = useColorModeValue("white", "gray.700");
  const chakraTextColor = useColorModeValue("gray.700", "white");
  const chakraPlaceholderColor = useColorModeValue("gray.400", "gray.400");
  const chakraBorderColor = useColorModeValue("inherit", "gray.600");
  const chakraHoverBorderColor = useColorModeValue("gray.400", "gray.500");
  const chakraFocusedBorderColor = "teal.300";
  const chakraSelectedBg = "teal.300";
  const chakraSelectedText = "white";
  const chakraHoverBg = useColorModeValue("teal.50", "gray.600");
  const chakraHoverText = useColorModeValue("gray.700", "white");

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '15px',
      borderColor: state.isFocused ? chakraFocusedBorderColor : chakraBorderColor,
      boxShadow: state.isFocused ? `0 0 0 1px ${chakraFocusedBorderColor}` : 'none',
      background: chakraBg,
      color: chakraTextColor,
      minHeight: '40px',
      fontSize: 'sm',
      '&:hover': {
        borderColor: chakraHoverBorderColor,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? chakraSelectedBg
        : state.isFocused
        ? chakraHoverBg
        : 'transparent',
      color: state.isSelected
        ? chakraSelectedText
        : state.isFocused
        ? chakraHoverText
        : chakraTextColor,
      fontSize: 'sm',
      '&:active': {
        backgroundColor: state.isSelected ? chakraSelectedBg : chakraHoverBg,
      },
    }),
    input: (provided) => ({
      ...provided,
      color: chakraTextColor,
      fontSize: 'sm',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: chakraPlaceholderColor,
      fontSize: 'sm',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: chakraTextColor,
      fontSize: 'sm',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: chakraBg,
      borderColor: chakraBorderColor,
      boxShadow: 'md',
      borderRadius: 'lg',
      zIndex: 9999,
    }),
  };

  // --- Fetching Provinces from Public API ---
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const response = await fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json");
        if (!response.ok) throw new Error("Gagal mengambil data provinsi dari API publik.");
        const data = await response.json();
        const formattedProvinces = data.map(p => ({ value: p.id, label: p.name }));
        setProvinces(formattedProvinces);
      } catch (err) {
        console.error("Failed to fetch provinces:", err);
        setGeneralError("Gagal memuat daftar provinsi dari API publik. Silakan coba lagi.");
      } finally {
        setLoadingProvinces(false);
      }
    };
    fetchProvinces();
  }, []);

  // --- Fetching Cities for IDENTITAS PENANYA from Public API ---
  useEffect(() => {
    if (formData.provinsi) {
      setLoadingCities(true);
      const provinceId = formData.provinsi.value;
      const fetchCities = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
          if (!response.ok) throw new Error("Gagal mengambil data kota/kabupaten dari API publik.");
          const data = await response.json();
          const formattedCities = data.map(c => ({ value: c.id, label: c.name }));
          setCities(formattedCities);
        } catch (err) {
          console.error(`Failed to fetch cities for province ${provinceId}:`, err);
          setGeneralError("Gagal memuat daftar kota/kabupaten dari API publik. Silakan coba lagi.");
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
    setFormData(prev => ({ ...prev, kabupaten: null }));
  }, [formData.provinsi]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData((prev) => ({ ...prev, [actionMeta.name]: selectedOption }));
  };

  const handleSubmit = async (e) => { // <<< === Jadikan async ===
    e.preventDefault();
    setGeneralError(null); // Reset error
    setLoadingSubmit(true); // Mulai loading

    // Mempersiapkan data untuk dikirim ke Laravel
    const dataToSend = {
      nama: formData.nama,
      email: formData.email,
      tanggal_lahir: formData.tanggal_lahir,
      jenis_kelamin: formData.jenis_kelamin?.value || '', // Mengirim 'value' dari Jenis Kelamin
      alamat: formData.alamat,
      provinsi: formData.provinsi?.label || '', // Mengirim 'label' (nama) provinsi
      kabupaten: formData.kabupaten?.label || '', // Mengirim 'label' (nama) kabupaten
      kode_pos: formData.kode_pos,
      telpon_hp: formData.telpon_hp,
      no_identitas: formData.no_identitas,
      topik: formData.topik,
      jenis_pertanyaan: formData.jenis_pertanyaan?.label || '', // Mengirim 'label' dari Jenis Pertanyaan
      uraian_pertanyaan: formData.uraian_pertanyaan, // Mengirim 'uraian_pertanyaan'
    };

    // Validasi sederhana di frontend
    if (
      !dataToSend.nama ||
      !dataToSend.email ||
      !dataToSend.alamat ||
      !dataToSend.provinsi ||
      !dataToSend.kabupaten ||
      !dataToSend.uraian_pertanyaan
    ) {
      setGeneralError("Harap isi semua kolom wajib (*).");
      setLoadingSubmit(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pertanyaan", { // <<< === URL API Laravel untuk Pertanyaan ===
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) { // Status 2xx
        toast({
          title: "Pertanyaan Berhasil Diajukan!",
          description: result.message || "Pertanyaan Anda telah berhasil dikirim.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Reset form setelah sukses
        setFormData({
          nama: "", email: "", tanggal_lahir: "", jenis_kelamin: null, alamat: "",
          provinsi: null, kabupaten: null, kode_pos: "", telpon_hp: "", no_identitas: "",
          topik: "", jenis_pertanyaan: null, uraian_pertanyaan: "",
        });
        onClose(); // Tutup modal
      } else { // Status 4xx atau 5xx
        let errorMessage = result.message || "Gagal mengajukan pertanyaan. Silakan coba lagi.";
        if (result.errors) {
          const validationErrors = Object.values(result.errors).flat().join(" ");
          errorMessage = `Validasi Gagal: ${validationErrors}`;
        }
        setGeneralError(errorMessage);
        toast({
          title: "Pengajuan Gagal",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setGeneralError("Terjadi kesalahan jaringan atau server. Pastikan backend Laravel berjalan.");
      toast({
        title: "Kesalahan Jaringan",
        description: "Tidak dapat terhubung ke server. Pastikan backend berjalan.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoadingSubmit(false); // Selesai loading
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={{ base: "10px", md: "20px" }}>
      {generalError && (
        <Alert status="error" mb="15px" fontSize={{ base: "sm", md: "md" }}>
          <AlertIcon />
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      <Heading size="md" mb="20px">I. IDENTITAS PENANYA</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: "15px", md: "20px" }}>
        <FormControl id="nama" isRequired>
          <FormLabel fontSize="sm">Nama</FormLabel>
          <Input name="nama" value={formData.nama} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel fontSize="sm">E-Mail</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="tanggal_lahir"> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Tanggal Lahir</FormLabel>
          <Input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="jenis_kelamin"> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Jenis Kelamin</FormLabel>
          <Select
            name="jenis_kelamin"
            options={jenisKelaminOptions}
            value={formData.jenis_kelamin}
            onChange={(selectedOption) => handleSelectChange(selectedOption, {name: 'jenis_kelamin'})}
            styles={customSelectStyles}
            placeholder="Pilih Jenis Kelamin"
          />
        </FormControl>
        <FormControl id="alamat" gridColumn={{ base: "auto", md: "1 / span 2" }} isRequired>
          <FormLabel fontSize="sm">Alamat</FormLabel>
          <Textarea name="alamat" value={formData.alamat} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="provinsi" isRequired> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Propinsi</FormLabel>
          <Select
            name="provinsi"
            options={provinces}
            value={formData.provinsi}
            onChange={handleSelectChange}
            placeholder={loadingProvinces ? "Memuat..." : "Cari Propinsi"}
            isLoading={loadingProvinces}
            isSearchable
            styles={customSelectStyles}
          />
        </FormControl>
        <FormControl id="kabupaten" isRequired> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Kabupaten</FormLabel>
          <Select
            name="kabupaten"
            options={cities}
            value={formData.kabupaten}
            onChange={handleSelectChange}
            placeholder={loadingCities ? "Memuat..." : "Pilih Kota/Kabupaten"}
            isDisabled={!formData.provinsi || loadingCities}
            isLoading={loadingCities}
            isSearchable
            styles={customSelectStyles}
          />
        </FormControl>
        <FormControl id="kode_pos"> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Kode Pos</FormLabel>
          <Input name="kode_pos" value={formData.kode_pos} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="telpon_hp"> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Telpon/HP</FormLabel>
          <Input name="telpon_hp" value={formData.telpon_hp} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="no_identitas" gridColumn={{ base: "auto", md: "1 / span 2" }}> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">No Identitas (KTP/SIM/Paspor)</FormLabel>
          <Input name="no_identitas" value={formData.no_identitas} onChange={handleInputChange} size="md" />
        </FormControl>
      </SimpleGrid>

      <Heading size="md" mt="40px" mb="20px">II. PERTANYAAN</Heading>
      <SimpleGrid columns={1} spacing="20px">
        <FormControl id="topik">
          <FormLabel fontSize="sm">Topik</FormLabel>
          <Input name="topik" value={formData.topik} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="jenis_pertanyaan"> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Jenis Pertanyaan</FormLabel>
          <Select
            name="jenis_pertanyaan"
            value={formData.jenis_pertanyaan}
            onChange={(selectedOption) => handleSelectChange(selectedOption, {name: 'jenis_pertanyaan'})} // <<< === Sesuaikan name ===
            options={jenisPertanyaanOptions} // Menggunakan opsi yang didefinisikan secara lokal
            styles={customSelectStyles}
            placeholder="Pilih Jenis Pertanyaan"
          />
        </FormControl>
        <FormControl id="uraian_pertanyaan" isRequired> {/* <<< === Sesuaikan nama prop === */}
          <FormLabel fontSize="sm">Uraian</FormLabel>
          <Textarea name="uraian_pertanyaan" value={formData.uraian_pertanyaan} onChange={handleInputChange} rows={5} size="md" />
        </FormControl>
      </SimpleGrid>

      <Flex justifyContent="flex-end" mt="30px">
        <Button colorScheme="red" mr="10px" onClick={onClose} size="md" isDisabled={loadingSubmit}>
          Batal
        </Button>
        <Button
          colorScheme="teal"
          type="submit"
          size="md"
          isLoading={loadingSubmit}
          loadingText="Mengirim..."
        >
          Kirim Pertanyaan
        </Button>
      </Flex>
    </Box>
  );
}

export default FormPertanyaan;