// import { useEffect, useState } from 'react'
// import { Container, Form, Stack } from 'react-bootstrap'

// export const SearchBar = () => {
//   const [playId, setPlayId] = useState(344)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm)
//     }, 500)
//     return () => clearTimeout(timeout)
//   }, [searchTerm])

//   const handleSearch = event => {
//     setSearchTerm(event.target.value)
//   }
//   const handleFilterPlayId = event => {
//     setPlayId(event.target.value)
//   }

//   useEffect(() => {
//     onSearch(debouncedSearchTerm)
//   }, [debouncedSearchTerm])

//   useEffect(() => {
//     onFilterPlayId(playId)
//   }, [playId])

//   return (
//     <Container>
//       <Stack direction="horizontal" gap={2}>
//         <Form.Control
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           style={{ flexGrow: 3, width: 0 }}
//         />
//         <Form.Control
//           type="date"
//           aria-label="Play ID"
//           style={{ flexGrow: 1, width: 0 }}></Form.Control>
//       </Stack>
//     </Container>
//   )
// }
