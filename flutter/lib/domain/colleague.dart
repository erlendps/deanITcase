class Colleague {
  final String name;
  final String imageUrl;
  final String? gender;

  Colleague(this.name, this.imageUrl, this.gender);

  Colleague.fromJson(Map<String, dynamic> json)
      : name = json['Name'],
        imageUrl = json['Image'],
        gender = json['Gender'];

  Map<String, dynamic> toJson() => {
    'Name': name,
    'Image': imageUrl,
    'Gender': gender,
  };
}