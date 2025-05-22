package models

type MongoBird struct {
	CommonName          string `bson:"Common Name" json:"common_name"`
	ScientificName      string `bson:"Scientific Name" json:"scientific_name"`
	NatureCount1        string `bson:"Nature Counts Grouping (1)" json:"nature_count_1"`
	NatureCount2        string `bson:"Nature Counts Grouping (2)" json:"nature_count_2"`
	NatureCount3        string `bson:"Nature Counts Grouping (3)" json:"nature_count_3"`
	TRCARank1           string `bson:"TRCA L-Rank" json:"trca_l_rank1"`
	TRCARank2           string `bson:"TRCA L-Rank2" json:"trca_l_rank2"`
	EbirdFamily         string `bson:"ebird Family Category" json:"ebird_family"`
	Code                string `bson:"Code" json:"code"`
	Habitat             string `bson:"Habitat" json:"habitat"`
	LocalOccurance      string `bson:"Local Occurance" json:"local_occurance"`
	NationalPoplTrend   string `bson:"National Popl Trend" json:"national_popl_trend"`
	TRCAPoplTrend       string `bson:"TRCA Popl Trend" json:"trca_popl_trend"`
	AreaSensitivity     string `bson:"Area Sensitivity" json:"area_sensitivity"`
	PatchIsoSensitivity string `bson:"Patch Isolation Sensitivity" json:"patch_isolation_sensitivity"`
	SensitivityToDevl   string `bson:"Sensitivity to Devl'm" json:"sensitivity_to_devl"`
	HabitatDependence   string `bson:"Habitat Dependence" json:"habitat_dependence"`
	Breeding2020        string `bson:"Breeding 2020" json:"breeding_2020"`
	GlobalGRank         string `bson:"Global G-Rank" json:"global_g_rank"`
	OntarioSRank        string `bson:"Ontario S-Rank" json:"ontario_s_rank"`
	CanadaCOSEWIC       string `bson:"Canada COSEWIC" json:"canada_cosewic"`
	Obs1991SwanL        string `bson:"Observed 1991 SwanL" json:"observed_1991_swanl"`
	Obs2020SwanL        string `bson:"Observed 2020 SwanL" json:"observed_2020_swanl"`
	Obs2024SwanL        string `bson:"Observed 2024 SwanL" json:"observed_2024_swanl"`
}

type MongoDBDocument struct {
	CommonName string `bson:"Common Name" json:"common_name"`
}

type BirdDBStruct struct {
	BirdInfo MongoBird
	Error    error
}
