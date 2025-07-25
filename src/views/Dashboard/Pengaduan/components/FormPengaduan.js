// src/views/Dashboard/Pengaduan/components/FormPengaduan.js
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
  AlertDescription,
  Heading,
  Flex,
  useColorModeValue,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Select from 'react-select';

function FormPengaduan({ onClose }) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    // ==== IDENTITAS PENGADU ====
    nama: "",
    email: "",
    tanggal_lahir: "",
    jenis_kelamin: null,
    alamat: "",
    provinsi: null,
    kabupaten: null,
    kode_pos: "",
    telpon_hp: "",
    no_identitas: "",

    // ==== IDENTITAS YANG DIADUKAN ====
    kategori_pengaduan: null,
    tempat_memperoleh_barang_jasa: "",
    // status_yang_diadukan: null, // <<< === DIHILANGKAN ===
    alamat_yang_diadukan: "",
    provinsi_yang_diadukan: null,
    kabupaten_yang_diadukan: null,
    uraian_pengaduan: "",
  });

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesTerdiladu, setCitiesTerdiladu] = useState([]);
  // const [statuses, setStatuses] = useState([]); // <<< === DIHILANGKAN ===

  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingCitiesTerdiladu, setLoadingCitiesTerdiladu] = useState(false);
  // const [loadingStatuses, setLoadingStatuses] = useState(false); // <<< === DIHILANGKAN ===

  const jenisKelaminOptions = [
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' }
  ];

  const whatIsComplainedOptions = [
    { value: 'Pembiayaan', label: 'Pembiayaan' },
    { value: 'Perbankan', label: 'Perbankan' },
    { value: 'Elektronik', label: 'Elektronik' },
    { value: 'Perumahan/Property', label: 'Perumahan/Property' },
    { value: 'Telekomunikasi', label: 'Telekomunikasi' },
    { value: 'E Commerce', label: 'E Commerce' },
    { value: 'Transportasi', label: 'Transportasi' },
    { value: 'Jasa Perbankan', label: 'Jasa Perbankan' },
    { value: 'Lain-lain', label: 'Lain-lain' },
  ];

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

  // --- Fetching Cities for IDENTITAS PENGADU from Public API ---
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

  // --- Fetching Cities for IDENTITAS YANG DIADUKAN from Public API ---
  useEffect(() => {
    if (formData.provinsi_yang_diadukan) {
      setLoadingCitiesTerdiladu(true);
      const provinceId = formData.provinsi_yang_diadukan.value;
      const fetchCitiesTerdiladu = async () => {
        try {
          const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`);
          if (!response.ok) throw new Error("Gagal mengambil data kota/kabupaten (teradu) dari API publik.");
          const data = await response.json();
          const formattedCities = data.map(c => ({ value: c.id, label: c.name }));
          setCitiesTerdiladu(formattedCities);
        } catch (err) {
          console.error(`Failed to fetch cities for terdiladu province ${provinceId}:`, err);
          setGeneralError("Gagal memuat daftar kota/kabupaten yang diadukan dari API publik. Silakan coba lagi.");
        } finally {
          setLoadingCitiesTerdiladu(false);
        }
      };
      fetchCitiesTerdiladu();
    } else {
      setCitiesTerdiladu([]);
    }
    setFormData(prev => ({ ...prev, kabupaten_yang_diadukan: null }));
  }, [formData.provinsi_yang_diadukan]);

  // <<< === BAGIAN FETCHING STATUS DIHILANGKAN ===
  // useEffect(() => {
  //   const fetchStatuses = async () => {
  //     setLoadingStatuses(true);
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/api/statuses");
  //       if (!response.ok) throw new Error("Gagal mengambil daftar status.");
  //       const data = await response.json();
  //       setStatuses(data);
  //     } catch (err) {
  //       console.error("Failed to fetch statuses:", err);
  //       setGeneralError("Gagal memuat daftar status. Silakan coba lagi.");
  //     } finally {
  //       setLoadingStatuses(false);
  //     }
  //   };
  //   fetchStatuses();
  // }, []);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData((prev) => ({ ...prev, [actionMeta.name]: selectedOption }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError(null);
    setLoadingSubmit(true);

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
      kategori_pengaduan: formData.kategori_pengaduan?.label || '', // Mengirim 'label' (nama) kategori pengaduan
      tempat_memperoleh_barang_jasa: formData.tempat_memperoleh_barang_jasa,
      // status_yang_diadukan: formData.status_yang_diadukan?.label || '', // <<< === DIHILANGKAN ===
      alamat_yang_diadukan: formData.alamat_yang_diadukan,
      provinsi_yang_diadukan: formData.provinsi_yang_diadukan?.label || '',
      kabupaten_yang_diadukan: formData.kabupaten_yang_diadukan?.label || '',
      uraian_pengaduan: formData.uraian_pengaduan,
    };

    // Validasi sederhana di frontend (sesuaikan dengan isRequired di JSX)
    if (
      !dataToSend.nama ||
      !dataToSend.email ||
      !dataToSend.alamat ||
      !dataToSend.provinsi ||
      !dataToSend.kabupaten ||
      !dataToSend.kategori_pengaduan ||
      // !dataToSend.status_yang_diadukan || // <<< === DIHILANGKAN ===
      !dataToSend.uraian_pengaduan
    ) {
      setGeneralError("Harap isi semua kolom wajib (*).");
      setLoadingSubmit(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/pengaduan", { // URL API Laravel Anda
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Pengaduan Berhasil!",
          description: result.message || "Pengaduan Anda telah berhasil diajukan.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Reset form setelah sukses
        setFormData({
          nama: "", email: "", tanggal_lahir: "", jenis_kelamin: null, alamat: "",
          provinsi: null, kabupaten: null, kode_pos: "", telpon_hp: "", no_identitas: "",
          kategori_pengaduan: null, tempat_memperoleh_barang_jasa: "",
          // status_yang_diadukan: null, // <<< === DIHILANGKAN ===
          alamat_yang_diadukan: "", provinsi_yang_diadukan: null, kabupaten_yang_diadukan: null,
          uraian_pengaduan: "",
        });
        onClose();
      } else {
        let errorMessage = result.message || "Gagal mengajukan pengaduan. Silakan coba lagi.";
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
      setLoadingSubmit(false);
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

      <Heading size="md" mb="20px">I. IDENTITAS PENGADU</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: "15px", md: "20px" }}>
        <FormControl id="nama" isRequired>
          <FormLabel fontSize="sm">Nama</FormLabel>
          <Input name="nama" value={formData.nama} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel fontSize="sm">E-Mail</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="tanggal_lahir">
          <FormLabel fontSize="sm">Tanggal Lahir</FormLabel>
          <Input type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="jenis_kelamin">
          <FormLabel fontSize="sm">Jenis Kelamin</FormLabel>
          <Select
            name="jenis_kelamin"
            options={jenisKelaminOptions}
            value={formData.jenis_kelamin}
            onChange={handleSelectChange}
            styles={customSelectStyles}
            placeholder="Pilih Jenis Kelamin"
          />
        </FormControl>
        <FormControl id="alamat" gridColumn={{ base: "auto", md: "1 / span 2" }} isRequired>
          <FormLabel fontSize="sm">Alamat</FormLabel>
          <Textarea name="alamat" value={formData.alamat} onChange={handleInputChange} size="md" />
        </FormControl>

        <FormControl id="provinsi" isRequired>
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
        <FormControl id="kabupaten" isRequired>
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

        <FormControl id="kode_pos">
          <FormLabel fontSize="sm">Kode Pos</FormLabel>
          <Input name="kode_pos" value={formData.kode_pos} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="telpon_hp">
          <FormLabel fontSize="sm">Telpon/HP</FormLabel>
          <Input name="telpon_hp" value={formData.telpon_hp} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="no_identitas" gridColumn={{ base: "auto", md: "1 / span 2" }}>
          <FormLabel fontSize="sm">No Identitas (KTP/SIM/Paspor)</FormLabel>
          <Input name="no_identitas" value={formData.no_identitas} onChange={handleInputChange} size="md" />
        </FormControl>
      </SimpleGrid>

      <Heading size="md" mt="40px" mb="20px">II. IDENTITAS YANG DIADUKAN</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: "15px", md: "20px" }}>
        <FormControl id="kategori_pengaduan" isRequired>
          <FormLabel fontSize="sm">Apa yang Diadukan</FormLabel>
          <Select
            name="kategori_pengaduan"
            options={whatIsComplainedOptions}
            value={formData.kategori_pengaduan}
            onChange={handleSelectChange}
            placeholder="Pilih Kategori Pengaduan"
            isSearchable
            styles={customSelectStyles}
          />
        </FormControl>

        <FormControl id="tempat_memperoleh_barang_jasa" gridColumn={{ base: "auto", md: "1 / span 2" }}>
          <FormLabel fontSize="sm">Tempat Memperoleh Barang dan Jasa</FormLabel>
          <Input name="tempat_memperoleh_barang_jasa" value={formData.tempat_memperoleh_barang_jasa} onChange={handleInputChange} size="md" />
        </FormControl>
        
        {/* <<< === FORM CONTROL UNTUK STATUS DIHILANGKAN === */}
        {/* <FormControl id="status_yang_diadukan" isRequired>
          <FormLabel fontSize="sm">Status</FormLabel>
          <Select
            name="status_yang_diadukan"
            options={statuses}
            value={formData.status_yang_diadukan}
            onChange={handleSelectChange}
            placeholder={loadingStatuses ? "Memuat..." : "Pilih Status"}
            isLoading={loadingStatuses}
            styles={customSelectStyles}
          />
        </FormControl> */}
        <FormControl id="alamat_yang_diadukan" gridColumn={{ base: "auto", md: "1 / span 2" }}>
          <FormLabel fontSize="sm">Alamat</FormLabel>
          <Textarea name="alamat_yang_diadukan" value={formData.alamat_yang_diadukan} onChange={handleInputChange} size="md" />
        </FormControl>
        <FormControl id="provinsi_yang_diadukan">
          <FormLabel fontSize="sm">Propinsi</FormLabel>
          <Select
            name="provinsi_yang_diadukan"
            options={provinces}
            value={formData.provinsi_yang_diadukan}
            onChange={handleSelectChange}
            placeholder={loadingProvinces ? "Memuat..." : "Cari Propinsi"}
            isLoading={loadingProvinces}
            isSearchable
            styles={customSelectStyles}
          />
        </FormControl>
        <FormControl id="kabupaten_yang_diadukan">
          <FormLabel fontSize="sm">Kabupaten</FormLabel>
          <Select
            name="kabupaten_yang_diadukan"
            options={citiesTerdiladu}
            value={formData.kabupaten_yang_diadukan}
            onChange={handleSelectChange}
            placeholder={loadingCitiesTerdiladu ? "Memuat..." : "Pilih Kota/Kabupaten"}
            isDisabled={!formData.provinsi_yang_diadukan || loadingCitiesTerdiladu}
            isLoading={loadingCitiesTerdiladu}
            isSearchable
            styles={customSelectStyles}
          />
        </FormControl>
      </SimpleGrid>

      <Box mt="30px">
        <FormControl id="uraian_pengaduan" isRequired>
          <FormLabel fontSize="sm">Uraian Pengaduan</FormLabel>
          <Textarea name="uraian_pengaduan" value={formData.uraian_pengaduan} onChange={handleInputChange} size="md" rows={5} />
        </FormControl>
      </Box>

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
          Kirim Pengaduan
        </Button>
      </Flex>
    </Box>
  );
}

export default FormPengaduan;