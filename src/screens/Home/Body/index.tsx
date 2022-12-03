import { observer } from "mobx-react-lite";
import styled from "styled-components";

import HeaderBlock from "@shared/components/HeaderBlock";
import Link from "@shared/components/Link";
import BlockContent from "../components/BlockContent";
import ListWrapper from "../components/ListWrapper";
import ExperienceBlock from "./ExperienceBlock";
import SkillsStore from "@/store/Skills";
import sampleCodeImg from "@assets/sample_code.png";

const portfolio_links = [
  "Bootstrap 4 Material Design (Sample Link)",
  "Modern JavaScript stack",
  "Datepicker for twitter bootstrap",
  "Fast and reliable Bootstrap widgets in Angular ",
];

const Body = observer(() => {
  return (
    <Container className="container mx-auto flex flex-col justify-center">
      <div className="flex justify-between">
        <div className="flex justify-between">
          <BlockContent>
            <ListWrapper title="Portfolio">
              <ul className="flex flex-col gap-2">
                {portfolio_links.map((link, idx) => {
                  return (
                    <ListItem key={link + idx} className="flex">
                      <Link children={link} />
                    </ListItem>
                  );
                })}
              </ul>
            </ListWrapper>
          </BlockContent>
          <BlockContent>
            <ExperienceBlockWrapper title="Experience">
              <ul className="flex flex-col gap-2">
                {SkillsStore.skills.map((skill) => {
                  return (
                    <ExperienceBlock key={skill.id} defaultValue={skill.exp?.toString() ?? "0"} skillName={skill.title} id={skill.id} />
                  );
                })}
              </ul>
            </ExperienceBlockWrapper>
          </BlockContent>
        </div>

        <BlockContent>
          <HeaderBlock children="Sample code" />
          <Image src={sampleCodeImg} className="mt-4" />
        </BlockContent>

        <BlockContent className="flex flex-col gap-6">
          <div>
            <HeaderBlock children="Availability" />
            <p>Full-time</p>
          </div>

          <div>
            <HeaderBlock children="Preferred Environment" />
            <p>GitHub, Mac OSX</p>
          </div>
        </BlockContent>
      </div>
    </Container>
  );
});

const Container = styled.div`
  height: 50vh;
  min-height: 200px;
  max-height: 300px;
`;

export const ExperienceBlockWrapper = styled(ListWrapper)`
  max-width: 190px;
  overflow-wrap: anywhere;
`;

export const ExperienceTextContainer = styled.p`
  max-width: 180px;
`;

export const ListItem = styled.li`
  &:before {
    content: "—";
    margin-right: 1rem;
  }
`;

const Image = styled.img`
  @media (max-width: 1280px) {
    height: 120px;
  }
`;

export default Body;
