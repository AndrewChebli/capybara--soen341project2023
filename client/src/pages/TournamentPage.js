import React, { useEffect } from "react";
import { Grid, Typography, Card, CardContent} from "@mui/material";

function TournamentPage(props) {
  // let participants = props.participants;

  const participants = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
  ];
  const [rounds, setRounds] = React.useState([]);
  const [matches, setMatches] = React.useState([]);
  const [rankings, setRankings] = React.useState([]);
  const [currentRound, setCurrentRound] = React.useState(0);
  const [currentMatch, setCurrentMatch] = React.useState(0);
  const [tournament, setTournament] = React.useState([]);

  const generateRoundFirstRound = (currentParticipantsRemaining) => {
    console.log(currentParticipantsRemaining.length);

    let temp_matches = [];
    for (let i = 0; i < currentParticipantsRemaining.length; i += 2) {
      let match = [
        currentParticipantsRemaining[i],
        currentParticipantsRemaining[i + 1],
      ];
      if (i === currentParticipantsRemaining.length - 3) {
        match.push(currentParticipantsRemaining[i + 2]);
        temp_matches.push(match);
        break;
      }
      temp_matches.push(match);
    }
    setMatches(temp_matches);
    setRounds(...rounds, temp_matches);
    console.log(rounds);
  };
  useEffect(() => {
    generateRoundFirstRound(participants);

  }, []);


  const recursive_generate_rounds = (round_participants) => {
      for (let i = round_participants.length - 1; i >= 0; i = i/2) {
      console.log(i);
      }
  }



  return (
      <Grid container sx = {{ mt: 20, border : 2}} direction = "row"  >
        {matches.map((match) => {
          return (
              <Grid item xs = {"auto"}container direction = "row" spacing = {1} sx = {{mx : 2}}>
                <Grid item xs = "auto">
                  <Card>
                    <CardContent>
                      <Typography variant = "h6">{match[0]}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs = "auto">
                  <Card>
                    <CardContent>
                      <Typography variant = "h6">{match[1]}</Typography>
                    </CardContent>
                  </Card>
                  </Grid>
            </Grid>
          );
        })}
      </Grid>
  );
}

export default TournamentPage;
