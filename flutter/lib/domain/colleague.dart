class Colleague {
  final String name;
  final String imageUrl;
  final String? sex;

  Colleague(this.name, this.imageUrl, this.sex);

  Colleague.fromJson(Map<String, dynamic> json)
      : name = json['Name'],
        imageUrl = json['Image'],
        sex = json['Sex'];

  Map<String, dynamic> toJson() => {
    'Name': name,
    'Image': imageUrl,
    'Sex': sex,
  };
}