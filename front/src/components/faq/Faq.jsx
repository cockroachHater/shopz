import Container from "react-bootstrap/Container";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { appUrl } from "../../api/appUrl";

export default function Faq() {
  const [faq, setFaq] = useState([
    {
      faq_seq: 0,
      faq_title: "",
      faq_contents: "",
    },
  ]);

  useEffect(() => {
    appUrl
      .get("/faqList")
      .then((res) => setFaq(res.data))
      .catch((err) => console.log(err));
  }, [setFaq]);

  return (
    <>
      <Container>
        <div className="title_text">FAQ</div>
        {faq &&
          faq.map((faq, i) => (
            <Accordion key={i}>
              <AccordionSummary
                expandIcon={<GridExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel1-header"
              >
                <Typography component="span">{faq.faq_title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant={"p"}>
                  <pre>{faq.faq_contents}</pre>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      </Container>
    </>
  );
}
