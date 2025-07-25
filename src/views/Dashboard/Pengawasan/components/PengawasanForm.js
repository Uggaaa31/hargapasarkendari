import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select, // Make sure Select is imported
  Textarea,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  Button,
  VStack,
  SimpleGrid,
  Text,
  IconButton,
  InputGroup,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { FaUpload, FaTimes } from 'react-icons/fa';

// IMPORTANT: Add this CSS to your global stylesheet (e.g., index.css or App.css)
// This hides the native calendar icon that browsers add to input type="date"
/*
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
input[type="date"] {
  -moz-appearance: textfield; // For Firefox compatibility
}
input[type="date"]::-moz-calendar-picker-indicator {
  display: none;
}
*/

function PengawasanForm({ formData, onFormChange, onDetailChange, onSubmit }) {
  // --- PALET WARNA DARI TEMA DASHBOARD ANDA (#00A389 sebagai aksen) ---
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  const primaryDashboardTeal = "#00A389"; // Warna aksen utama: teal
  const primaryDashboardTealHoverLight = "#008a74"; // Sedikit lebih gelap
  const primaryDashboardTealHoverDark = "#2ee8c2"; // Sedikit lebih terang

  const accentColor = primaryDashboardTeal;
  const accentColorHover = useColorModeValue(primaryDashboardTealHoverLight, primaryDashboardTealHoverDark);

  const inputBorderColor = useColorModeValue("gray.200", "gray.600"); // Warna border input
  const hoverBg = useColorModeValue("gray.50", "gray.800"); // Latar belakang hover yang lembut

  const {
    tanggalPengawasan,
    namaPengawas,
    namaObjekPengawasan,
    lokasiKabupatenKota,
    waktuPengawasan,
    jenisPengawasan,
    detailPengawasan,
    catatanUmum,
    lampiran,
  } = formData;

  const handleSpecificDetailChange = (e) => {
    const { name, value, type, checked } = e.target;
    onDetailChange(name, type === 'checkbox' ? checked : value);
  };

  const handleFileChange = (e) => {
    onFormChange({ target: { name: 'lampiran', files: e.target.files } });
  };

  const handleRemoveFile = () => {
    onFormChange({ target: { name: 'lampiran', files: [] } });
  };

  const lokasiOptions = ['Kota Kendari', 'Kota Konawe', 'Kota Baubau', 'Kab Konawe Selatan','Kab Konawe Kepulauan', 'Kab Konawe Utara', 'Kab Kolaka Timur', 'Kab Kolaka','Kab Kolaka Utara', 'Kab Bombana', 'Kab Buton', 'Kab Buton Utara','Kab Buton Selatan', 'Kab Buton Tengah', 'Kab Muna', 'Kab Muna Barat', 'Kab Wakatobi'];
  // NEW: Options for Nama Pengawas
  const namaPengawasOptions = ["Hasmindar", "Andi Zakiah Wahida", "Indri", "Amir Pae", "Windy Dianovita", "Annisyah Ringgasa", "Kemal Jusra", "La Ode Muh.Fitrah Arsyad"];

  return (
    <Box p={0} borderWidth="0px" borderRadius="none" bg="transparent" shadow="none">
      <VStack as="form" spacing={6} onSubmit={onSubmit} align="stretch">
        {/* Bagian Umum Pengawasan */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <FormControl id="tanggalPengawasan" isRequired>
            <FormLabel color={textColor} fontWeight="semibold">Tanggal Pengawasan</FormLabel>
            <InputGroup>
              <Input
                type="date"
                name="tanggalPengawasan"
                value={tanggalPengawasan}
                onChange={onFormChange}
                size="lg"
                borderColor={inputBorderColor}
                color={textColor}
                _hover={{ borderColor: accentColor }}
                _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                borderRadius="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="namaPengawas" isRequired>
            <FormLabel color={textColor} fontWeight="semibold">Nama Pengawas</FormLabel>
            <InputGroup>
              <Select // Changed from Input to Select
                name="namaPengawas"
                value={namaPengawas}
                onChange={onFormChange}
                size="lg"
                borderColor={inputBorderColor}
                color={textColor}
                _hover={{ borderColor: accentColor }}
                _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                borderRadius="md"
              >
                <option value="">-- Pilih Nama Pengawas --</option>
                {namaPengawasOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
            </InputGroup>
          </FormControl>

          <FormControl id="namaObjekPengawasan" isRequired>
            <FormLabel color={textColor} fontWeight="semibold">Nama Objek Pengawasan (Perusahaan/Individu)</FormLabel>
            <InputGroup>
              <Input
                type="text"
                name="namaObjekPengawasan"
                value={namaObjekPengawasan}
                onChange={onFormChange}
                placeholder="Cth: PT Makmur Sentosa / Bpk. Rudi"
                size="lg"
                borderColor={inputBorderColor}
                color={textColor}
                _hover={{ borderColor: accentColor }}
                _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                borderRadius="md"
              />
            </InputGroup>
          </FormControl>

          <FormControl id="lokasiKabupatenKota" isRequired>
            <FormLabel color={textColor} fontWeight="semibold">Lokasi (Kabupaten/Kota)</FormLabel>
            <InputGroup>
              <Select
                name="lokasiKabupatenKota"
                value={lokasiKabupatenKota}
                onChange={onFormChange}
                size="lg"
                borderColor={inputBorderColor}
                color={textColor}
                _hover={{ borderColor: accentColor }}
                _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                borderRadius="md"
              >
                <option value="">-- Pilih Kabupaten/Kota --</option>
                {lokasiOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </InputGroup>
            {lokasiKabupatenKota === 'Lainnya' && (
              <Input
                mt={3}
                type="text"
                name="lokasiLainnya"
                value={detailPengawasan.lokasiLainnya || ''}
                onChange={handleSpecificDetailChange}
                placeholder="Masukkan lokasi lainnya"
                size="lg"
                isRequired
                borderColor={inputBorderColor}
                color={textColor}
                _hover={{ borderColor: accentColor }}
                _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                borderRadius="md"
              />
            )}
          </FormControl>
        </SimpleGrid>

        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend" fontWeight="semibold" color={textColor}>Waktu Pengawasan</FormLabel>
          <RadioGroup name="waktuPengawasan" value={waktuPengawasan} onChange={(val) => onFormChange({ target: { name: 'waktuPengawasan', value: val } })}>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={5}>
              <Radio value="Berkala" colorScheme="teal" size="lg" color={textColor}>Berkala</Radio>
              <Radio value="Khusus" colorScheme="teal" size="lg" color={textColor}>Khusus (Ada Laporan/Pengaduan)</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {/* Pilihan Jenis Pengawasan */}
        <FormControl id="jenisPengawasan" isRequired>
          <FormLabel color={textColor} fontWeight="semibold">Jenis Pengawasan</FormLabel>
          <InputGroup>
            <Select
              name="jenisPengawasan"
              value={jenisPengawasan}
              onChange={onFormChange}
              size="lg"
              borderColor={inputBorderColor}
              color={textColor}
              _hover={{ borderColor: accentColor }}
              _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
              borderRadius="md"
            >
              <option value="">-- Pilih Jenis Pengawasan --</option>
              <option value="Barang Beredar">Pengawasan Barang Beredar</option>
              <option value="Jasa">Pengawasan Jasa</option>
              <option value="Perdagangan">Pengawasan Perdagangan</option>
            </Select>
          </InputGroup>
        </FormControl>

        {/* Bagian Detail Spesifik (Conditional Rendering) */}
        {jenisPengawasan && (
          <Box p={6} bg={useColorModeValue("gray.50", "gray.800")} borderRadius="lg" shadow="sm" transition="all 0.3s ease-in-out">
            <Heading as="h3" size="md" mb={5} textAlign="center" color={textColor} fontWeight="bold">
              Detail Pengawasan {jenisPengawasan}
            </Heading>
            {jenisPengawasan === 'Barang Beredar' && (
              <VStack align="stretch" spacing={4}>
                <Checkbox
                  name="sesuaiSNI"
                  isChecked={detailPengawasan.sesuaiSNI || false}
                  onChange={handleSpecificDetailChange}
                  colorScheme="teal"
                  size="lg"
                  color={textColor}
                >
                  Kesesuaian dengan SNI
                </Checkbox>
                <Checkbox
                  name="kelengkapanLabel"
                  isChecked={detailPengawasan.kelengkapanLabel || false}
                  onChange={handleSpecificDetailChange}
                  colorScheme="teal"
                  size="lg"
                  color={textColor}
                >
                  Kelengkapan Label
                </Checkbox>
                <Checkbox
                  name="ketersediaanKartuGaransi"
                  isChecked={detailPengawasan.ketersediaanKartuGaransi || false}
                  onChange={handleSpecificDetailChange}
                  colorScheme="teal"
                  size="lg"
                  color={textColor}
                >
                  Ketersediaan Kartu Garansi
                </Checkbox>
                <FormControl>
                  <FormLabel color={textColor}>Informasi Tambahan Barang Beredar</FormLabel>
                  <Textarea
                    name="infoTambahanBarang"
                    value={detailPengawasan.infoTambahanBarang || ''}
                    onChange={handleSpecificDetailChange}
                    placeholder="Cth: Masa kadaluarsa, nomor izin edar, dll."
                    rows={3}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  />
                </FormControl>
              </VStack>
            )}

            {jenisPengawasan === 'Jasa' && (
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel color={textColor}>Jenis Jasa</FormLabel>
                  <Select
                    name="jenisJasa"
                    value={detailPengawasan.jenisJasa || ''}
                    onChange={handleSpecificDetailChange}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  >
                    <option value="">-- Pilih Jenis Jasa --</option>
                    <option value="Pengiriman">Jasa Pengiriman</option>
                    <option value="Travel">Jasa Travel</option>
                    <option value="Keuangan">Jasa Keuangan</option>
                    <option value="Perawatan">Jasa Perawatan/Servis</option>
                    <option value="Lainnya">Lainnya</option>
                  </Select>
                </FormControl>
                <Checkbox
                  name="kepatuhanPerizinanJasa"
                  isChecked={detailPengawasan.kepatuhanPerizinanJasa || false}
                  onChange={handleSpecificDetailChange}
                  colorScheme="teal"
                  size="lg"
                  color={textColor}
                >
                  Kepatuhan Perizinan Jasa
                </Checkbox>
                <FormControl>
                  <FormLabel color={textColor}>Kualitas Layanan</FormLabel>
                  <Textarea
                    name="kualitasLayanan"
                    value={detailPengawasan.kualitasLayanan || ''}
                    onChange={handleSpecificDetailChange}
                    placeholder="Deskripsikan kualitas layanan yang diamati."
                    rows={3}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel color={textColor}>Informasi Tambahan Jasa</FormLabel>
                  <Textarea
                    name="infoTambahanJasa"
                    value={detailPengawasan.infoTambahanJasa || ''}
                    onChange={handleSpecificDetailChange}
                    placeholder="Cth: Standar layanan, keluhan pelanggan, dll."
                    rows={3}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  />
                </FormControl>
              </VStack>
            )}

            {jenisPengawasan === 'Perdagangan' && (
              <VStack align="stretch" spacing={4}>
                <FormControl>
                  <FormLabel color={textColor}>Jenis Perizinan</FormLabel>
                  <Select
                    name="jenisPerizinan"
                    value={detailPengawasan.jenisPerizinan || ''}
                    onChange={handleSpecificDetailChange}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  >
                    <option value="">-- Pilih Jenis Izin --</option>
                    <option value="Minol">Izin Minuman Beralkohol (Minol)</option>
                    <option value="B2">Izin Bahan Berbahaya (B2)</option>
                    <option value="Gudang">Izin Gudang</option>
                    <option value="SIUP">SIUP</option>
                    <option value="TDP">TDP</option>
                    <option value="Lainnya">Lainnya</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel color={textColor}>Status Perizinan</FormLabel>
                  <Select
                    name="statusPerizinan"
                    value={detailPengawasan.statusPerizinan || ''}
                    onChange={handleSpecificDetailChange}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="Ada/Berlaku">Ada/Berlaku</option>
                    <option value="Kadaluarsa">Kadaluarsa</option>
                    <option value="Tidak Ada">Tidak Ada</option>
                  </Select>
                </FormControl>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl>
                    <FormLabel color={textColor}>Nomor Izin</FormLabel>
                    <Input
                      type="text"
                      name="nomorIzin"
                      value={detailPengawasan.nomorIzin || ''}
                      onChange={handleSpecificDetailChange}
                      placeholder="Cth: 123/SIUP/IV/2023"
                      size="lg"
                      borderColor={inputBorderColor}
                      color={textColor}
                      _hover={{ borderColor: accentColor }}
                      _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={textColor}>Tanggal Terbit Izin</FormLabel>
                    <Input
                      type="date"
                      name="tanggalTerbitIzin"
                      value={detailPengawasan.tanggalTerbitIzin || ''}
                      onChange={handleSpecificDetailChange}
                      size="lg"
                      borderColor={inputBorderColor}
                      color={textColor}
                      _hover={{ borderColor: accentColor }}
                      _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel color={textColor}>Tanggal Kedaluwarsa Izin</FormLabel>
                    <Input
                      type="date"
                      name="tanggalKedaluwarsaIzin"
                      value={detailPengawasan.tanggalKedaluwarsaIzin || ''}
                      onChange={handleSpecificDetailChange}
                      size="lg"
                      borderColor={inputBorderColor}
                      color={textColor}
                      _hover={{ borderColor: accentColor }}
                      _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                      borderRadius="md"
                    />
                  </FormControl>
                </SimpleGrid>
                <FormControl>
                  <FormLabel color={textColor}>Informasi Tambahan Perdagangan</FormLabel>
                  <Textarea
                    name="infoTambahanPerdagangan"
                    value={detailPengawasan.infoTambahanPerdagangan || ''}
                    onChange={handleSpecificDetailChange}
                    placeholder="Cth: Pelanggaran yang ditemukan, sanksi, dll."
                    rows={3}
                    size="lg"
                    borderColor={inputBorderColor}
                    color={textColor}
                    _hover={{ borderColor: accentColor }}
                    _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
                    borderRadius="md"
                  />
                </FormControl>
              </VStack>
            )}
          </Box>
        )}

        {/* Keterangan/Catatan Umum */}
        <FormControl id="catatanUmum">
          <FormLabel color={textColor} fontWeight="semibold">Keterangan/Catatan Umum</FormLabel>
          <Textarea
            name="catatanUmum"
            value={catatanUmum}
            onChange={onFormChange}
            placeholder="Tuliskan catatan tambahan mengenai pengawasan ini."
            rows={4}
            size="lg"
            borderColor={inputBorderColor}
            color={textColor}
            _hover={{ borderColor: accentColor }}
            _focus={{ borderColor: accentColor, boxShadow: `0 0 0 1px ${accentColor}` }}
            borderRadius="md"
          />
        </FormControl>

        {/* Lampiran (File Upload) */}
        <FormControl id="lampiran">
          <FormLabel color={textColor} fontWeight="semibold">Lampiran (Foto/Dokumen)</FormLabel>
          <Box
            borderWidth="2px"
            borderColor={inputBorderColor}
            borderStyle="dashed"
            borderRadius="md"
            p={4}
            textAlign="center"
            cursor="pointer"
            _hover={{ borderColor: accentColor, bg: hoverBg }}
            transition="all 0.2s ease-in-out"
            position="relative"
            bg={useColorModeValue("white", "gray.800")}
          >
            <Input
              type="file"
              name="lampiran"
              onChange={handleFileChange}
              accept="image/*, application/pdf"
              position="absolute"
              opacity="0"
              height="full"
              width="full"
              top="0"
              left="0"
              cursor="pointer"
            />
            {lampiran ? (
              <HStack justifyContent="center" spacing={2}>
                <Text fontWeight="semibold" color={textColor}>{lampiran.name}</Text>
                <IconButton
                  aria-label="Hapus file"
                  icon={<FaTimes />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                />
              </HStack>
            ) : (
              <VStack>
                <FaUpload size="28px" color={secondaryTextColor} />
                <Text color={secondaryTextColor} fontSize="md" fontWeight="medium">Seret & lepas file di sini, atau klik untuk memilih</Text>
              </VStack>
            )}
          </Box>
        </FormControl>

        <Button
          type="submit"
          bg={accentColor}
          color="white"
          size="lg"
          width="full"
          mt={4}
          borderRadius="lg"
          shadow="md"
          _hover={{ shadow: 'lg', transform: 'translateY(-2px)', bg: accentColorHover }}
          _active={{ shadow: 'sm', transform: 'translateY(0)', bg: accentColor }}
          transition="all 0.2s ease-in-out"
          fontWeight="semibold"
        >
          Simpan Data Pengawasan
        </Button>
      </VStack>
    </Box>
  );
}

export default PengawasanForm;