
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeroEditForm from "./HeroEditForm";
import { useProductManagement } from "@/hooks/useProductManagement";

const HeroImagesList = () => {
  const { heroImages, updateHeroImage, deleteHeroImage, addHeroImage } = useProductManagement();
  const [editingHero, setEditingHero] = useState<number | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (index: number) => {
    setEditingHero(index);
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingHero(null);
  };

  const handleSave = (heroData: any, isNew: boolean) => {
    if (isNew) {
      addHeroImage(heroData);
      setIsAddingNew(false);
    } else {
      updateHeroImage(editingHero!, heroData);
      setEditingHero(null);
    }
  };

  const handleCancel = () => {
    setEditingHero(null);
    setIsAddingNew(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this hero image?")) {
      deleteHeroImage(index);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-light">Hero Images</h2>
        <Button onClick={handleAddNew} className="bg-black hover:bg-gray-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Hero Image
        </Button>
      </div>

      {isAddingNew && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Hero Image</CardTitle>
          </CardHeader>
          <CardContent>
            <HeroEditForm
              onSave={(data) => handleSave(data, true)}
              onCancel={handleCancel}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {heroImages.map((hero, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              {editingHero === index ? (
                <HeroEditForm
                  hero={hero}
                  onSave={(data) => handleSave(data, false)}
                  onCancel={handleCancel}
                />
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={hero.src}
                      alt={hero.alt}
                      className="w-20 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{hero.alt}</h3>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroImagesList;
