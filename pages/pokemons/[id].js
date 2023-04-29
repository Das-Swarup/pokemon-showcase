import React from "react";
import Layout from "../../components/Layout";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import Link from "next/link";

const Details = ({ pokeman, styles }) => {
  console.log(pokeman);
  return (
    <Layout title={pokeman.pokemon.name}>
      <div className="pt-8 flex flex-wrap sm:flex-nowrap justify-center mx-auto">
        <div>
          <img src={pokeman.pokemon.image} alt="" />
        </div>
        <div style={{ marginLeft: "2rem" }}>
          <p className="text-4xl font-semibold">
            <span className="mr-4">#{pokeman.pokemon.number}</span>
            <span>{pokeman.pokemon.name}</span>
          </p>
          <br />
          <p>
            <span>Species:&nbsp;</span>
            <span>{pokeman.pokemon.classification}</span>
          </p>
          <p>{pokeman.description}</p>
          <p>
            <span>Height:&nbsp;</span>
            <span>{pokeman.pokemon.height.minimum}</span>
          </p>
          <p>
            <span>Weight:&nbsp;</span>
            <span>{pokeman.pokemon.weight.minimum}</span>
          </p>
          <br />
          <p>
            {pokeman.pokemon.types.map((type, j) => {
              return (
                <span
                  key={type}
                  className="text-white text-2xl font-semibold mr-2 px-4 rounded"
                  style={{ backgroundColor: styles[type.toLowerCase()] }}
                >
                  {type}
                </span>
              );
            })}
          </p>
          <div>
            <br />
            <span className="text-xl font-semibold">Weakness:&nbsp;</span>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
            >
              {pokeman.pokemon.weaknesses.map((weakness, l) => {
                return (
                  <p
                    key={weakness}
                    className="text-white text-2xl font-semibold mr-2 px-4 rounded"
                    style={{
                      backgroundColor: styles[weakness.toLowerCase()],
                      width: "max-content",
                      marginTop: "5px",
                    }}
                  >
                    {weakness}
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <br />
            <span className="text-xl font-semibold">Resistance:&nbsp;</span>
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}
            >
              {pokeman.pokemon.resistant.map((resistance, m) => {
                return (
                  <p
                    key={resistance}
                    className="text-white text-2xl font-semibold mr-2 px-4 rounded"
                    style={{
                      backgroundColor: styles[resistance.toLowerCase()],
                      width: "max-content",
                      marginTop: "5px",
                    }}
                  >
                    {resistance}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen text-center my-5">
        <p className="text-4xl font-semibold">Evolutions</p>
        <div className="flex flex-wrap justify-center mx-auto">
          {pokeman.pokemon.evolutions ? (
            pokeman.pokemon.evolutions.map((evo, k) => {
              return (
                <Link href={`/pokemons/${evo.name}`}>
                  <div key={evo.name} className="p-4" style={{cursor:"pointer"}}>
                    <div className="bg-gray-200 py-4 px-6 rounded">
                      <img
                        src={evo.image}
                        alt=""
                        className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                      />
                      <span className="font-semibold text-1xl mr-2">
                        #{`${evo.number}`}
                      </span>
                      <p className="text-center">
                        <span className="text-3xl">{evo.name}</span>
                      </p>
                      <div className="text-center">
                        {evo.types.map((type, j) => {
                          return (
                            <span
                              key={type}
                              className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                              style={{
                                backgroundColor: styles[type.toLowerCase()],
                              }}
                            >
                              {type}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              <span className="text-3xl">No evolutions found</span>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  try {
    const { data } = await client.query({
      query: gql`
      query poke{
        pokemon(name:"${query.id}"){
          number
          name
          classification
          types
          maxHP
          image   
          resistant
          weaknesses
          height {
            minimum
            maximum
          }
          weight {
            minimum
            maximum
          }
          evolutions{
            id
            number
            name
            types 
            image
        }
      }
    }
    `,
    });
    return {
      props: {
        pokeman: data,
        styles: {
          normal: "#A8A77A",
          fire: "#EE8130",
          water: "#6390F0",
          electric: "#F7D02C",
          grass: "#7AC74C",
          ice: "#96D9D6",
          fighting: "#C22E28",
          poison: "#A33EA1",
          ground: "#E2BF65",
          flying: "#A98FF3",
          psychic: "#F95587",
          bug: "#A6B91A",
          rock: "#B6A136",
          ghost: "#735797",
          dragon: "#6F35FC",
          dark: "#705746",
          steel: "#B7B7CE",
          fairy: "#D685AD",
        },
      },
    };
  } catch (error) {
    console.log(error);
  }
}

export default Details;
